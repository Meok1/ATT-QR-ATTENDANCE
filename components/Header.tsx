<<<<<<< HEAD
import { MaterialIcons } from '@expo/vector-icons';
=======
import Ionicons from '@expo/vector-icons/Ionicons';
>>>>>>> 9abba22 (Midterm AttQr)
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.logoCircle}>
        <MaterialIcons name="qr-code-scanner" size={36} color={COLORS.logo} />
=======
      <View style={styles.logoLockup}>
        <View style={styles.logoCircle}>
          <Ionicons name="qr-code" size={48} color={COLORS.textOnPrimary} />
        </View>
        <View style={styles.logoTag}>
          <Text style={styles.logoTagText}>QR</Text>
          <Text style={styles.logoTagText}>CODE</Text>
        </View>
>>>>>>> 9abba22 (Midterm AttQr)
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
<<<<<<< HEAD
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
=======
  logoLockup: {
    width: 170,
    height: 88,
    position: 'relative',
    marginBottom: 12,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  logoTag: {
    width: 116,
    height: 58,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 14,
    position: 'absolute',
    right: 0,
    top: 15,
  },
  logoTagText: {
    color: COLORS.textOnPrimary,
    fontSize: 17,
    lineHeight: 19,
    fontWeight: '900',
    letterSpacing: 1,
>>>>>>> 9abba22 (Midterm AttQr)
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
