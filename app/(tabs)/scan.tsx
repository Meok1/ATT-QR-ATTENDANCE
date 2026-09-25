import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
<<<<<<< HEAD
import { COLORS } from '@/constants/colors';

import { registerAttendance } from "@/lib/database"     ;
import { useAuth } from '@/lib/auth';

export default function ScanScreen() {
const { user } = useAuth();
const studentId = user?.id ?? 'unknown';
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);

=======
import { useAuth } from '@/components/AuthProvider';
import { COLORS } from '@/constants/colors';
import { registerAttendance } from '@/lib/attendance';

export default function ScanScreen() {
  const { session, profile } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);
>>>>>>> 9abba22 (Midterm AttQr)
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Needed</Text>
        <Text style={styles.subtitle}>
          We need access to your camera to scan QR codes.
        </Text>
        <AppButton
          theme="primary"
          title="Grant Permission"
          icon="camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

<<<<<<< HEAD
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setLastData(data);
    registerAttendance(data, studentId).then((result) => {
      setMessage(result.message);
      setSuccess(result.success);
    });
  };

  const handleScanAgain = () => {
    setScanned(false);
    setLastData(null);
    setMessage(null);
  };



=======
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLastData(data);
    if (!session || !profile || profile.role !== 'student') {
      setMessage('Only student accounts can record attendance.');
      return;
    }
    try {
      const result = await registerAttendance(data, session.user.id);
      setSuccess(result.success);
      setMessage(result.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not record attendance.');
    }
  };

>>>>>>> 9abba22 (Midterm AttQr)
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {scanned ? 'QR Code detected!' : 'Point your camera at a QR code'}
        </Text>

<<<<<<< HEAD
        {scanned && message && (
          <Text
            style={[styles.scanResult, success ? styles.success : styles.error]}
          >
            {message}
          </Text>
        )}

        {scanned && lastData && (
          <Text style={styles.scanData}>{lastData}</Text>
        )}
=======
        {scanned && lastData && (
          <Text style={styles.scanResult}>{lastData}</Text>
        )}

        {message && <Text style={[styles.message, success && styles.success]}>{message}</Text>}
>>>>>>> 9abba22 (Midterm AttQr)

        {scanned && (
          <AppButton
            theme="primary"
            title="Scan Again"
            icon="refresh"
<<<<<<< HEAD
            onPress={() => setScanned(false)}
=======
            onPress={() => {
              setScanned(false);
              setLastData(null);
              setMessage(null);
              setSuccess(false);
            }}
>>>>>>> 9abba22 (Midterm AttQr)
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  overlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 60,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  scanResult: {
    fontSize: 14,
<<<<<<< HEAD
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600'
  },
  success: { color: '#2E7D32' },   // green — attendance recorded
  error: { color: '#C62828' },   // red — failed / duplicate
  scanData: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 12
  },

});
=======
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#B71C1C',
    textAlign: 'center',
    marginBottom: 12,
  },
  success: { color: '#2E7D32' },
});
>>>>>>> 9abba22 (Midterm AttQr)
