import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import AppButton from '@/components/AppButton';
import { useAuth } from '@/components/AuthProvider';
import { COLORS } from '@/constants/colors';
import { registerAttendance } from '@/lib/attendance';

export default function ScanScreen() {
  const { session, profile } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);
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
          We need access to your camera to scan your QR codes.
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

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLastData(data);
    setSuccess(false);

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

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.qrScanner} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet">
          <Rect width="256" height="256" fill="rgba(255,255,255,0.92)" />
          <Rect x="0" y="0" width="88" height="88" fill={COLORS.primary} />
          <Rect x="20" y="20" width="48" height="48" fill="white" />
          <Rect x="30" y="30" width="28" height="28" fill={COLORS.primary} />
          <Rect x="168" y="0" width="88" height="88" fill={COLORS.primary} />
          <Rect x="188" y="20" width="48" height="48" fill="white" />
          <Rect x="198" y="30" width="28" height="28" fill={COLORS.primary} />
          <Rect x="0" y="168" width="88" height="88" fill={COLORS.primary} />
          <Rect x="20" y="188" width="48" height="48" fill="white" />
          <Rect x="30" y="198" width="28" height="28" fill={COLORS.primary} />
          <Rect x="108" y="0" width="20" height="20" fill={COLORS.primary} />
          <Rect x="128" y="20" width="20" height="48" fill={COLORS.primary} />
          <Rect x="108" y="48" width="20" height="32" fill={COLORS.primary} />
          <Rect x="108" y="108" width="20" height="20" fill={COLORS.primary} />
          <Rect x="0" y="108" width="20" height="20" fill={COLORS.primary} />
          <Rect x="20" y="128" width="40" height="20" fill={COLORS.primary} />
          <Rect x="80" y="128" width="68" height="20" fill={COLORS.primary} />
          <Rect x="168" y="108" width="20" height="40" fill={COLORS.primary} />
          <Rect x="188" y="108" width="20" height="20" fill={COLORS.primary} />
          <Rect x="228" y="108" width="20" height="40" fill={COLORS.primary} />
          <Rect x="108" y="158" width="20" height="40" fill={COLORS.primary} />
          <Rect x="128" y="178" width="40" height="20" fill={COLORS.primary} />
          <Rect x="168" y="158" width="68" height="20" fill={COLORS.primary} />
          <Rect x="148" y="198" width="20" height="20" fill={COLORS.primary} />
          <Rect x="188" y="178" width="48" height="20" fill={COLORS.primary} />
          <Rect x="208" y="198" width="28" height="20" fill={COLORS.primary} />
          <Rect x="108" y="218" width="40" height="20" fill={COLORS.primary} />
          <Rect x="128" y="238" width="20" height="18" fill={COLORS.primary} />
          <Rect x="228" y="238" width="28" height="18" fill={COLORS.primary} />
        </Svg>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {scanned ? 'QR Code detected!' : 'Point your camera at a QR code'}
        </Text>

        {scanned && lastData && <Text style={styles.scanResult}>{lastData}</Text>}
        {message && <Text style={[styles.message, success && styles.success]}>{message}</Text>}

        {scanned && (
          <AppButton
            theme="primary"
            title="Scan Again"
            icon="refresh"
            onPress={() => {
              setScanned(false);
              setLastData(null);
              setMessage(null);
              setSuccess(false);
            }}
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
  qrScanner: {
    position: 'absolute',
    width: 280,
    height: 280,
    alignSelf: 'center',
    top: '50%',
    marginTop: -130,
    justifyContent: 'center',
    alignItems: 'center',
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
