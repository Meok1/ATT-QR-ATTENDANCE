<<<<<<< HEAD
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
=======
import { Link, router } from 'expo-router';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import AppButton from '@/components/AppButton';
>>>>>>> 9abba22 (Midterm AttQr)
import { COLORS } from '@/constants/colors';
import { signUp } from '@/lib/auth';

export default function RegisterScreen() {
<<<<<<< HEAD
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);

    if (!email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await signUp(email.trim(), password);

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Header title="QR Attendance" />
            </View>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Register to start recording attendance</Text>

            {success ? (
              <View style={styles.successContainer}>
                <Text style={styles.successTitle}>Check your email!</Text>
                <Text style={styles.successText}>
                  We sent a confirmation link to {email}. Click the link to verify your
                  account, then come back and sign in.
                </Text>
                <Link href="/login" style={styles.link}>
                  Back to Sign In
                </Link>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@school.edu"
                  placeholderTextColor={COLORS.textSecondary}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor={COLORS.textSecondary}
                  secureTextEntry
                  editable={!loading}
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                  secureTextEntry
                  editable={!loading}
                />

                {error && <Text style={styles.error}>{error}</Text>}

                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
                ) : (
                  <AppButton
                    theme="primary"
                    title="Sign Up"
                    icon="person-add-outline"
                    onPress={handleRegister}
                  />
                )}
              </View>
            )}

            {!success && (
              <Link href="/login" style={styles.link}>
                Already have an account? Sign In
              </Link>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
=======
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleRegister = async () => {
    const normalizedEmail = email.trim();
    if (!fullName.trim()) return setMessage('Full name is required.');
    if (!normalizedEmail.includes('@')) return setMessage('Enter a valid email address.');
    if (password.length < 6) return setMessage('Password must be at least 6 characters.');
    setBusy(true);
    setMessage(null);
    const { data, error } = await signUp(normalizedEmail, password, fullName.trim(), role);
    setBusy(false);
    if (error) return setMessage(error.message);
    if (!data.session) return setMessage('Account created. Check your email to confirm, then sign in.');
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <View style={styles.brandMark}>
          <Ionicons name="sparkles-outline" size={30} color={COLORS.textOnPrimary} />
        </View>
        <Text style={styles.eyebrow}>JOIN QR ATTENDANCE</Text>
        <Text style={styles.title}>Create account</Text>
        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>Full name</Text>
          <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={COLORS.textTertiary} value={fullName} onChangeText={setFullName} />
          <Text style={styles.fieldLabel}>Email address</Text>
          <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor={COLORS.textTertiary} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput style={styles.input} placeholder="At least 6 characters" placeholderTextColor={COLORS.textTertiary} secureTextEntry value={password} onChangeText={setPassword} />
          <Text style={styles.label}>I am signing up as</Text>
          <View style={styles.roleRow}>
            {(['student', 'teacher'] as const).map((option) => (
              <Pressable key={option} style={[styles.role, role === option && styles.roleSelected]} onPress={() => setRole(option)}>
                <Ionicons name={option === 'student' ? 'person-outline' : 'school-outline'} size={19} color={role === option ? COLORS.textOnPrimary : COLORS.primary} />
                <Text style={[styles.roleText, role === option && styles.roleTextSelected]}>{option[0].toUpperCase() + option.slice(1)}</Text>
              </Pressable>
            ))}
          </View>
          {message && <Text style={styles.message}>{message}</Text>}
          <AppButton theme="primary" title={busy ? 'Creating...' : 'Create account'} icon="person-add-outline" onPress={handleRegister} disabled={busy} />
        </View>
        <Link href="/login" style={styles.link}>Already have an account?</Link>
      </View>
    </KeyboardAvoidingView>
>>>>>>> 9abba22 (Midterm AttQr)
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  error: {
    fontSize: 14,
    color: '#C62828',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  loader: {
    marginVertical: 16,
  },
  link: {
    fontSize: 14,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 14,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
});
=======
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' },
  content: { padding: 24, width: '100%', maxWidth: 520, alignSelf: 'center' },
  brandMark: { width: 62, height: 62, borderRadius: 20, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', marginBottom: 18, shadowColor: COLORS.shadow, shadowOpacity: 0.2, shadowRadius: 12, elevation: 5 },
  eyebrow: { color: COLORS.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1.8, marginBottom: 8 },
  title: { color: COLORS.textPrimary, fontSize: 32, fontWeight: '800', marginBottom: 22 },
  formCard: { backgroundColor: COLORS.card, borderColor: COLORS.border, borderWidth: 1, borderRadius: 22, padding: 18, shadowColor: COLORS.shadow, shadowOpacity: 0.08, shadowRadius: 18, elevation: 3 },
  fieldLabel: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 7 },
  input: { backgroundColor: COLORS.surfaceLight, borderColor: COLORS.border, borderWidth: 1, borderRadius: 13, color: COLORS.textPrimary, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 15 },
  label: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2, marginBottom: 8 },
  roleRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  role: { flex: 1, minHeight: 54, borderColor: COLORS.border, borderWidth: 1, borderRadius: 13, padding: 10, alignItems: 'center', justifyContent: 'center', gap: 4 },
  roleSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  roleText: { color: COLORS.textPrimary, fontWeight: '700' },
  roleTextSelected: { color: COLORS.textOnPrimary },
  message: { color: '#B3265E', marginBottom: 12 },
  link: { color: COLORS.primary, fontWeight: '700', textAlign: 'center', marginTop: 18 },
});
>>>>>>> 9abba22 (Midterm AttQr)
