import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { storage } from '@/lib/storage';
import { useColors } from '@/hooks/use-colors';

export default function IndexScreen() {
  const router = useRouter();
  const colors = useColors();

  useEffect(() => {
    async function checkOnboarding() {
      const done = await storage.isOnboardingDone();
      if (done) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }
    checkOnboarding();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
