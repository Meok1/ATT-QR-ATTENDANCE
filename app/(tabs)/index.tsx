import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
import { useAuth } from '@/components/AuthProvider';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';

export default function Index() {
  const { profile } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Header title="QR Attendance" />
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.mainTitle}>School Event Attendance</Text>
          <Text style={styles.subtitle}>
            Scan QR codes to record attendance during school activities.
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <AppButton
            theme="primary"
            title="Scan QR Code"
            icon="qr-code-outline"
            onPress={() => router.push('/scan')}
          />
          <AppButton
            title="Attendance History"
            icon="time-outline"
            onPress={() => router.push('/history')}
          />
          <AppButton
            title="Profile"
            icon="person-outline"
            onPress={() => router.push('/profile')}
          />
          {profile?.role === 'teacher' && (
            <AppButton
              theme="primary"
              title="Create Event QR"
              icon="school-outline"
              onPress={() => router.push('/teacher')}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center' },
  scrollView: { width: '100%' },
  contentContainer: { alignItems: 'center', paddingTop: 6, paddingBottom: 28 },
  headerContainer: { justifyContent: 'center' },
  bodyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 4,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainTitle: { fontSize: 20, fontWeight: '800', color: COLORS.primary, marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  footerContainer: { alignItems: 'center', paddingHorizontal: 24, width: '100%', marginTop: 16 },
});
