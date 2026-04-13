import { prisma } from '../config/database';
import { UserRole, MenuPermission } from '@prisma/client';

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children: MenuItem[];
  order: number;
}

class DFSMenuService {
  private menuCache: Map<string, MenuItem[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private CACHE_TTL = 300000; // 5 minutes

  /**
   * DFS-based menu tree construction with role-based permission filtering
   * Uses depth-first search to traverse the menu permission graph
   * and build a hierarchical menu structure optimized for the user's role
   */
  async buildMenuTree(role: UserRole): Promise<MenuItem[]> {
    const cacheKey = role;
    const cached = this.getCachedMenu(cacheKey);
    if (cached) return cached;

    const permissions = await prisma.menuPermission.findMany({
      where: { role, isActive: true },
      orderBy: [{ order: 'asc' }, { menuKey: 'asc' }],
    });

    if (permissions.length === 0) {
      const defaultMenu = await this.getDefaultMenu(role);
      this.cacheMenu(cacheKey, defaultMenu);
      return defaultMenu;
    }

    // Build adjacency map for DFS traversal
    const adjacencyMap = this.buildAdjacencyMap(permissions);
    const rootNodes = permissions.filter(p => !p.parentId);

    // DFS traversal to build menu tree
    const menuTree: MenuItem[] = [];
    const visited = new Set<string>();

    for (const root of rootNodes) {
      if (visited.has(root.id)) continue;
      const menuItem = this.dfsTraverse(root.id, adjacencyMap, visited);
      if (menuItem) menuTree.push(menuItem);
    }

    // Sort by order
    menuTree.sort((a, b) => a.order - b.order);

    this.cacheMenu(cacheKey, menuTree);
    return menuTree;
  }

  /**
   * DFS traversal of menu node and its children
   */
  private dfsTraverse(
    nodeId: string,
    adjacencyMap: Map<string, MenuPermission[]>,
    visited: Set<string>
  ): MenuItem | null {
    if (visited.has(nodeId)) return null;
    visited.add(nodeId);

    const node = adjacencyMap.get(nodeId)?.[0];
    if (!node) return null;

    const children: MenuItem[] = [];
    const childNodes = adjacencyMap.get(nodeId) || [];

    for (const child of childNodes) {
      if (child.id === nodeId) continue;
      const childMenu = this.dfsTraverse(child.id, adjacencyMap, visited);
      if (childMenu) children.push(childMenu);
    }

    children.sort((a, b) => a.order - b.order);

    return {
      key: node.menuKey,
      label: node.label,
      icon: node.icon || undefined,
      path: node.path || undefined,
      children,
      order: node.order,
    };
  }

  /**
   * Build adjacency map from permissions for efficient DFS traversal
   */
  private buildAdjacencyMap(permissions: MenuPermission[]): Map<string, MenuPermission[]> {
    const map = new Map<string, MenuPermission[]>();

    for (const perm of permissions) {
      const parentId = perm.parentId || perm.id;
      if (!map.has(parentId)) map.set(parentId, []);
      map.get(parentId)!.push(perm);
    }

    return map;
  }

  /**
   * Get flat menu list for simple navigation
   */
  async getFlatMenu(role: UserRole): Promise<MenuPermission[]> {
    return prisma.menuPermission.findMany({
      where: { role, isActive: true },
      orderBy: [{ order: 'asc' }],
    });
  }

  /**
   * Default menu structure by role using DFS-based generation
   */
  private async getDefaultMenu(role: UserRole): Promise<MenuItem[]> {
    const defaultMenus: Record<UserRole, MenuItem[]> = {
      ADMIN: [
        { key: 'dashboard', label: 'Dashboard', icon: 'Dashboard', path: '/dashboard', children: [], order: 1 },
        { key: 'bookings', label: 'Bookings', icon: 'Calendar', path: '/bookings', children: [
          { key: 'all-bookings', label: 'All Bookings', path: '/bookings/all', children: [], order: 1 },
          { key: 'pending', label: 'Pending', path: '/bookings/pending', children: [], order: 2 },
          { key: 'confirmed', label: 'Confirmed', path: '/bookings/confirmed', children: [], order: 3 },
        ], order: 2 },
        { key: 'services', label: 'Services', icon: 'Cleaning', path: '/services', children: [], order: 3 },
        { key: 'users', label: 'Users', icon: 'People', path: '/users', children: [], order: 4 },
        { key: 'staff', label: 'Staff', icon: 'Badge', path: '/staff', children: [], order: 5 },
        { key: 'payments', label: 'Payments', icon: 'Payment', path: '/payments', children: [], order: 6 },
        { key: 'reviews', label: 'Reviews', icon: 'Star', path: '/reviews', children: [], order: 7 },
        { key: 'settings', label: 'Settings', icon: 'Settings', path: '/settings', children: [], order: 8 },
      ],
      MANAGER: [
        { key: 'dashboard', label: 'Dashboard', icon: 'Dashboard', path: '/dashboard', children: [], order: 1 },
        { key: 'bookings', label: 'Bookings', icon: 'Calendar', path: '/bookings', children: [
          { key: 'all-bookings', label: 'All Bookings', path: '/bookings/all', children: [], order: 1 },
          { key: 'pending', label: 'Pending', path: '/bookings/pending', children: [], order: 2 },
        ], order: 2 },
        { key: 'services', label: 'Services', icon: 'Cleaning', path: '/services', children: [], order: 3 },
        { key: 'staff', label: 'Staff', icon: 'Badge', path: '/staff', children: [], order: 4 },
        { key: 'reviews', label: 'Reviews', icon: 'Star', path: '/reviews', children: [], order: 5 },
      ],
      STAFF: [
        { key: 'dashboard', label: 'Dashboard', icon: 'Dashboard', path: '/dashboard', children: [], order: 1 },
        { key: 'my-bookings', label: 'My Bookings', icon: 'Calendar', path: '/my-bookings', children: [], order: 2 },
        { key: 'schedule', label: 'Schedule', icon: 'Schedule', path: '/schedule', children: [], order: 3 },
        { key: 'profile', label: 'Profile', icon: 'Person', path: '/profile', children: [], order: 4 },
      ],
      CUSTOMER: [
        { key: 'dashboard', label: 'Dashboard', icon: 'Dashboard', path: '/dashboard', children: [], order: 1 },
        { key: 'bookings', label: 'My Bookings', icon: 'Calendar', path: '/bookings', children: [], order: 2 },
        { key: 'services', label: 'Services', icon: 'Cleaning', path: '/services', children: [], order: 3 },
        { key: 'payments', label: 'Payments', icon: 'Payment', path: '/payments', children: [], order: 4 },
        { key: 'profile', label: 'Profile', icon: 'Person', path: '/profile', children: [], order: 5 },
      ],
    };

    return defaultMenus[role] || defaultMenus.CUSTOMER;
  }

  private getCachedMenu(role: string): MenuItem[] | null {
    const expiry = this.cacheExpiry.get(role);
    if (expiry && Date.now() < expiry) {
      return this.menuCache.get(role) || null;
    }
    this.menuCache.delete(role);
    this.cacheExpiry.delete(role);
    return null;
  }

  private cacheMenu(role: string, menu: MenuItem[]): void {
    this.menuCache.set(role, menu);
    this.cacheExpiry.set(role, Date.now() + this.CACHE_TTL);
  }

  invalidateCache(role?: UserRole): void {
    if (role) {
      this.menuCache.delete(role);
      this.cacheExpiry.delete(role);
    } else {
      this.menuCache.clear();
      this.cacheExpiry.clear();
    }
  }
}

export const dfsMenuService = new DFSMenuService();
