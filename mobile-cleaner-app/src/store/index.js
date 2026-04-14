import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, bookingsAPI, profileAPI, earningsAPI, setAuthToken } from '../api';

// ==================== Auth Slice ====================

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, refreshToken, user } = response.data.data;
      setAuthToken(token);

      if (rememberMe) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('refreshToken', refreshToken);
      }

      return { token, refreshToken, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      const { token, refreshToken, user } = response.data.data;
      setAuthToken(token);
      return { token, refreshToken, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue logout even if API call fails
    } finally {
      setAuthToken(null);
      await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return rejectWithValue('No token found');

      setAuthToken(token);
      const response = await profileAPI.getProfile();
      return { token, user: response.data.data };
    } catch (error) {
      setAuthToken(null);
      await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      // Restore Session
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.isLoading = false;
      });
  },
});

// ==================== Bookings Slice ====================

export const fetchTodayBookings = createAsyncThunk(
  'bookings/fetchToday',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingsAPI.getTodayBookings();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWeekBookings = createAsyncThunk(
  'bookings/fetchWeek',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await bookingsAPI.getWeekBookings(startDate, endDate);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ id, status, data }, { rejectWithValue }) => {
    try {
      const response = await bookingsAPI.updateBookingStatus(id, status, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkIn = createAsyncThunk(
  'bookings/checkIn',
  async ({ id, location }, { rejectWithValue }) => {
    try {
      const response = await bookingsAPI.checkIn(id, location);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkOut = createAsyncThunk(
  'bookings/checkOut',
  async ({ id, location }, { rejectWithValue }) => {
    try {
      const response = await bookingsAPI.checkOut(id, location);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    todayBookings: [],
    weekBookings: [],
    selectedBooking: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },
    clearBookings: (state) => {
      state.todayBookings = [];
      state.weekBookings = [];
      state.selectedBooking = null;
    },
    updateLocalBooking: (state, action) => {
      const updated = action.payload;
      const updateInArray = (arr) =>
        arr.map((b) => (b.id === updated.id ? { ...b, ...updated } : b));

      state.todayBookings = updateInArray(state.todayBookings);
      state.weekBookings = updateInArray(state.weekBookings);
      if (state.selectedBooking?.id === updated.id) {
        state.selectedBooking = { ...state.selectedBooking, ...updated };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Today
      .addCase(fetchTodayBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodayBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayBookings = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchTodayBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Week
      .addCase(fetchWeekBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeekBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weekBookings = action.payload;
      })
      .addCase(fetchWeekBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const updateInArray = (arr) =>
          arr.map((b) => (b.id === updated.id ? { ...b, ...updated } : b));
        state.todayBookings = updateInArray(state.todayBookings);
        state.weekBookings = updateInArray(state.weekBookings);
        if (state.selectedBooking?.id === updated.id) {
          state.selectedBooking = { ...state.selectedBooking, ...updated };
        }
      })
      // Check In
      .addCase(checkIn.fulfilled, (state, action) => {
        const updated = action.payload;
        const updateInArray = (arr) =>
          arr.map((b) => (b.id === updated.id ? { ...b, ...updated } : b));
        state.todayBookings = updateInArray(state.todayBookings);
        state.weekBookings = updateInArray(state.weekBookings);
        if (state.selectedBooking?.id === updated.id) {
          state.selectedBooking = { ...state.selectedBooking, ...updated };
        }
      })
      // Check Out
      .addCase(checkOut.fulfilled, (state, action) => {
        const updated = action.payload;
        const updateInArray = (arr) =>
          arr.map((b) => (b.id === updated.id ? { ...b, ...updated } : b));
        state.todayBookings = updateInArray(state.todayBookings);
        state.weekBookings = updateInArray(state.weekBookings);
        if (state.selectedBooking?.id === updated.id) {
          state.selectedBooking = { ...state.selectedBooking, ...updated };
        }
      });
  },
});

// ==================== Profile Slice ====================

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(profileData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAvailability = createAsyncThunk(
  'profile/updateAvailability',
  async (availability, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateAvailability(availability);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEarnings = createAsyncThunk(
  'profile/fetchEarnings',
  async ({ period, date }, { rejectWithValue }) => {
    try {
      let response;
      if (period === 'weekly') {
        response = await earningsAPI.getWeeklyEarnings(date);
      } else if (period === 'monthly') {
        response = await earningsAPI.getMonthlyEarnings(date);
      } else {
        response = await earningsAPI.getEarnings({ period, date });
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    earnings: {
      weekly: [],
      monthly: [],
      total: 0,
      pending: 0,
      paid: 0,
      breakdown: [],
      payouts: [],
    },
    isLoading: false,
    error: null,
    isUpdating: false,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.earnings = {
        weekly: [],
        monthly: [],
        total: 0,
        pending: 0,
        paid: 0,
        breakdown: [],
        payouts: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Update Availability
      .addCase(updateAvailability.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.availability = action.payload.availability;
        }
      })
      // Fetch Earnings
      .addCase(fetchEarnings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.earnings = { ...state.earnings, ...action.payload };
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ==================== Store ====================

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bookings: bookingsSlice.reducer,
    profile: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export { authSlice, bookingsSlice, profileSlice };
export const { clearError } = authSlice.actions;
export const { setSelectedBooking, clearBookings, updateLocalBooking } = bookingsSlice.actions;
export const { clearProfile } = profileSlice.actions;

export default store;
