import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { usePWA } from '@/hooks/use-pwa';

export function OfflineBanner() {
  const { isOnline } = usePWA();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setVisible(true);
    } else {
      // Hide after 2 seconds when back online
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (Platform.OS === 'web' && visible) {
    return (
      <View
        style={{
          backgroundColor: isOnline ? '#6BAF8A' : '#D4697A',
          paddingVertical: 12,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {isOnline ? '✓ Conectado' : '✕ Sem conexão - Modo offline'}
        </Text>
      </View>
    );
  }

  return null;
}
