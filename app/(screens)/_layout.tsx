import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="journey/timeline" />
      <Stack.Screen name="journey/prenatal" />
      <Stack.Screen name="journey/medications" />
      <Stack.Screen name="journey/enoxaparina" />
      <Stack.Screen name="journey/supplements" />
      <Stack.Screen name="journey/exams" />
      <Stack.Screen name="journey/dopplers" />
      <Stack.Screen name="journey/symptoms" />
      <Stack.Screen name="journey/diary" />
      <Stack.Screen name="journey/history" />
      <Stack.Screen name="journey/evolution" />
      <Stack.Screen name="journey/documents" />
      <Stack.Screen name="journey/calendar" />
      <Stack.Screen name="fiv" />
      <Stack.Screen name="premium" />
      <Stack.Screen name="guide-detail" />
      <Stack.Screen name="birth-plan" />
      <Stack.Screen name="about" />
      <Stack.Screen name="services" />
      <Stack.Screen name="partners" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="support" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="notifications-settings" />
      <Stack.Screen name="admin/index" />
      <Stack.Screen name="community/relatos" />
      <Stack.Screen name="community/births" />
      <Stack.Screen name="community/legislative" />
      <Stack.Screen name="community/campaigns" />
      <Stack.Screen name="community/gstar" />
      <Stack.Screen name="community/new-post" />
    </Stack>
  );
}
