import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@/components/AuthProvider';
import { COLORS } from '@/constants/colors';

export default function TabLayout() {
  const { role } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerTintColor: COLORS.textPrimary,
        tabBarStyle: {
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.12,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: -5 },
          elevation: 14,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarItemStyle: { borderRadius: 16, marginHorizontal: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'qr-code' : 'qr-code-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'time' : 'time-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {role === 'teacher' && (
        <Tabs.Screen
          name="teacher"
          options={{
            title: 'Teacher',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'school' : 'school-outline'}
                color={color}
                size={24}
              />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
