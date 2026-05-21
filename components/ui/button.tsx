import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'premium' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
}

const variantStyles = {
  primary: 'bg-primary',
  secondary: 'bg-transparent border-2 border-primary',
  ghost: 'bg-transparent',
  premium: 'bg-premium',
  danger: 'bg-error',
};

const textStyles = {
  primary: 'text-white font-semibold',
  secondary: 'text-primary font-semibold',
  ghost: 'text-primary font-semibold',
  premium: 'text-white font-semibold',
  danger: 'text-white font-semibold',
};

const sizeStyles = {
  sm: 'px-4 py-2 rounded-xl',
  md: 'px-6 py-3 rounded-2xl',
  lg: 'px-8 py-4 rounded-2xl',
};

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Text
        className={cn(
          'items-center justify-center flex-row text-center',
          variantStyles[variant],
          sizeStyles[size],
          textStyles[variant],
          textSizeStyles[size],
          className
        )}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </Text>
    </TouchableOpacity>
  );
}
