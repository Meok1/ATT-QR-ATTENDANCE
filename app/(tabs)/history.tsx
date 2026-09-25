<<<<<<< HEAD
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { useAuth } from '@/lib/auth';
import { getAttendanceHistory, type AttendanceRecord } from '@/lib/database';

export default function HistoryScreen() {
  const { user } = useAuth();
  const studentId = user?.id ?? 'unknown';
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(() => {
    const studentId = user?.id ?? 'unknown';
    getAttendanceHistory(studentId).then((rows) => {
      setRecords(rows);
      setLoading(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );
=======
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/components/AuthProvider';
import { COLORS } from '@/constants/colors';
import {
  getAttendanceHistory,
  getTeacherEventSummaries,
  type AttendanceRecord,
  type TeacherEventSummary,
} from '@/lib/attendance';

export default function HistoryScreen() {
  const { session, profile } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [events, setEvents] = useState<TeacherEventSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
    if (!session) return;
    const load = async () => {
      try {
        if (profile?.role === 'student') {
          setRecords(await getAttendanceHistory(session.user.id));
        } else if (profile?.role === 'teacher') {
          setEvents(await getTeacherEventSummaries(session.user.id));
        }
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'Could not load history.');
      }
    };
    load();
  }, [profile?.role, session]));
>>>>>>> 9abba22 (Midterm AttQr)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History</Text>
<<<<<<< HEAD

      {loading ? (
        <Text style={styles.subtitle}>Loading records...</Text>
      ) : records.length === 0 ? (
        <Text style={styles.subtitle}>
          No records yet. Scan a QR code to register your attendance.
        </Text>
=======
      {error && <Text style={styles.error}>{error}</Text>}
      {profile?.role === 'teacher' ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={events.length ? styles.list : styles.emptyList}
          ListEmptyComponent={<Text style={styles.subtitle}>Your created events will appear here.</Text>}
          renderItem={({ item }) => (
            <View style={styles.record}>
              <Text style={styles.recordTitle}>{item.title}</Text>
              <Text style={styles.recordDetail}>Code: {item.code}</Text>
              <Text style={styles.recordDetail}>{item.attendeeCount} attendee{item.attendeeCount === 1 ? '' : 's'}</Text>
              <Text style={styles.recordDetail}>{new Date(item.startsAt).toLocaleString()}</Text>
            </View>
          )}
        />
>>>>>>> 9abba22 (Midterm AttQr)
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => String(item.id)}
<<<<<<< HEAD
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.eventTitle}>{item.eventTitle}</Text>
              <Text style={styles.eventMeta}>{item.eventId}</Text>
              <Text style={styles.eventMeta}>{formatDate(item.scannedAt)}</Text>
=======
          contentContainerStyle={records.length ? styles.list : styles.emptyList}
          ListEmptyComponent={<Text style={styles.subtitle}>Your past attendance records will appear here.</Text>}
          renderItem={({ item }) => (
            <View style={styles.record}>
              <Text style={styles.recordTitle}>{item.eventTitle}</Text>
              <Text style={styles.recordDetail}>{new Date(item.scannedAt).toLocaleString()}</Text>
>>>>>>> 9abba22 (Midterm AttQr)
            </View>
          )}
        />
      )}
    </View>
  );
}

<<<<<<< HEAD
function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 32,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
=======
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 20, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
  list: { paddingBottom: 24 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  record: { backgroundColor: COLORS.card, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  recordTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  recordDetail: { fontSize: 13, color: COLORS.textSecondary },
  error: { color: '#B71C1C', marginBottom: 12 },
});
>>>>>>> 9abba22 (Midterm AttQr)
