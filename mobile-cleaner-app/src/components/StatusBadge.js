import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusColor, getStatusLightColor, getStatusLabel } from '../utils/helpers';

const StatusBadge = ({ status, size = 'medium', style }) => {
  const color = getStatusColor(status);
  const lightColor = getStatusLightColor(status);
  const label = getStatusLabel(status);

  const sizeStyles = {
    small: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: 11,
    },
    medium: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
    },
    large: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: lightColor, borderColor: color },
        currentSize,
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }, { fontSize: currentSize.fontSize }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  label: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default StatusBadge;
