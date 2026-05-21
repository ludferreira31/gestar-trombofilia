import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, showBack = false, rightAction }: HeaderProps) {
  const router = useRouter();
  const colors = useColors();

  return (
    <View className="flex-row items-center px-4 py-3 bg-background border-b border-border">
      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color={colors.primary} />
        </TouchableOpacity>
      )}
      <View className="flex-1">
        <Text className="text-lg font-bold text-foreground">{title}</Text>
        {subtitle && <Text className="text-xs text-muted">{subtitle}</Text>}
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
}
