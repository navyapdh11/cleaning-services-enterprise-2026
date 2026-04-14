import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from './StatusBadge';
import {
  formatTime,
  formatDate,
  formatAddress,
  getServiceTypeLabel,
  STATUS,
} from '../utils/helpers';

const JobCard = ({
  booking,
  onPress,
  onCheckIn,
  showCheckIn = false,
  compact = false,
  style,
}) => {
  const {
    id,
    scheduledAt,
    scheduledEnd,
    status,
    serviceType,
    customer,
    location,
    estimatedDuration,
  } = booking;

  const isInProgress = status === STATUS.IN_PROGRESS;
  const isCompleted = status === STATUS.COMPLETED;
  const canCheckIn = status === STATUS.CONFIRMED && showCheckIn;

  const handleCheckIn = () => {
    if (onCheckIn) {
      onCheckIn(id);
    }
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactCard, style]}
        onPress={() => onPress && onPress(id)}
        activeOpacity={0.7}
      >
        <View style={styles.compactHeader}>
          <View style={styles.timeBlock}>
            <Ionicons name="time-outline" size={16} color="#0EA5E9" />
            <Text style={styles.compactTime}>{formatTime(scheduledAt)}</Text>
          </View>
          <StatusBadge status={status} size="small" />
        </View>
        <View style={styles.compactBody}>
          <Text style={styles.compactService} numberOfLines={1}>
            {getServiceTypeLabel(serviceType)}
          </Text>
          <Text style={styles.compactAddress} numberOfLines={1}>
            {formatAddress(location?.address)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress && onPress(id)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateTime}>
          <View style={styles.timeRow}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.dateText}>{formatDate(scheduledAt)}</Text>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.timeText}>
              {formatTime(scheduledAt)} - {formatTime(scheduledEnd)}
              {estimatedDuration && (
                <Text style={styles.durationText}>
                  ({Math.round(estimatedDuration / 60)}h)
                </Text>
              )}
            </Text>
          </View>
        </View>
        <StatusBadge status={status} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.infoRow}>
          <Ionicons name="business-outline" size={20} color="#0EA5E9" style={styles.icon} />
          <View style={styles.infoText}>
            <Text style={styles.serviceType}>
              {getServiceTypeLabel(serviceType)}
            </Text>
            {customer && (
              <Text style={styles.customerName}>
                {customer.firstName} {customer.lastName}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#0EA5E9" style={styles.icon} />
          <Text style={styles.address} numberOfLines={2}>
            {formatAddress(location?.address)}
          </Text>
        </View>

        {location?.instructions && (
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={20} color="#0EA5E9" style={styles.icon} />
            <Text style={styles.instructions} numberOfLines={2}>
              {location.instructions}
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      {canCheckIn && (
        <>
          <View style={styles.divider} />
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={handleCheckIn}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
              <Text style={styles.checkInButtonText}>Check In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isInProgress && (
        <>
          <View style={styles.divider} />
          <View style={styles.inProgressFooter}>
            <Ionicons name="sync-outline" size={16} color="#8B5CF6" />
            <Text style={styles.inProgressText}>Currently In Progress</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  compactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  dateTime: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
  },
  timeText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  durationText: {
    color: '#9CA3AF',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  body: {
    padding: 16,
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
  },
  serviceType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerName: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  address: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  instructions: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    flex: 1,
  },
  footer: {
    padding: 16,
    paddingTop: 12,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  checkInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  inProgressFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  inProgressText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '500',
    marginLeft: 6,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactTime: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0EA5E9',
    marginLeft: 4,
  },
  compactBody: {
    marginTop: 4,
  },
  compactService: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  compactAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default JobCard;
