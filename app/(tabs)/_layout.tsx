import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';

function TabIcon({ name, color, label, focused }: { name: any; color: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
      <MaterialIcons name={name} size={24} color={color} />
      <Text style={{ fontSize: 10, color, marginTop: 2, fontWeight: focused ? '600' : '400' }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 64 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          elevation: 8,
          shadowColor: '#C9748F',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} label="Início" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="favorite" color={color} label="Jornada" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="menu-book" color={color} label="Guias" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="group" color={color} label="Comunidade" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} label="Perfil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
