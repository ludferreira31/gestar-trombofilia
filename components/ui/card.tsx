import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, className, style, onPress }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[{ borderRadius: 16 }, style]}
      >
        <View className={cn('bg-surface rounded-2xl p-4 border border-border shadow-sm', className)}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View className={cn('bg-surface rounded-2xl p-4 border border-border shadow-sm', className)} style={style}>
      {children}
    </View>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <Text className={cn('text-base font-semibold text-foreground mb-1', className)}>
      {children}
    </Text>
  );
}

export function CardSubtitle({ children, className }: CardTitleProps) {
  return (
    <Text className={cn('text-sm text-muted', className)}>
      {children}
    </Text>
  );
}

interface PremiumCardProps extends CardProps {
  locked?: boolean;
  onUnlock?: () => void;
}

export function PremiumCard({ children, className, locked, onUnlock, onPress }: PremiumCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={locked ? onUnlock : onPress}>
      <View
        className={cn('rounded-2xl p-4 border border-premium/30 overflow-hidden', className)}
        style={{ backgroundColor: '#F5F0FF' }}
      >
        {locked && (
          <View className="absolute top-3 right-3 bg-premium rounded-full px-2 py-0.5">
            <Text className="text-white text-xs font-semibold">Premium 💜</Text>
          </View>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
}
