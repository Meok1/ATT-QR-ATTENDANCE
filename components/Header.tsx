import Svg, { Rect } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Svg width={170} height={170} viewBox="0 0 256 256">
          <Rect width="256" height="256" fill="#FFFFFF" />
          <Rect x="0" y="0" width="88" height="88" fill="#F20A8A" />
          <Rect x="20" y="20" width="48" height="48" fill="#FFFFFF" />
          <Rect x="30" y="30" width="28" height="28" fill="#F20A8A" />
          <Rect x="168" y="0" width="88" height="88" fill="#F20A8A" />
          <Rect x="188" y="20" width="48" height="48" fill="#FFFFFF" />
          <Rect x="198" y="30" width="28" height="28" fill="#F20A8A" />
          <Rect x="0" y="168" width="88" height="88" fill="#F20A8A" />
          <Rect x="20" y="188" width="48" height="48" fill="#FFFFFF" />
          <Rect x="30" y="198" width="28" height="28" fill="#F20A8A" />
          <Rect x="108" y="0" width="20" height="20" fill="#F20A8A" />
          <Rect x="128" y="20" width="20" height="48" fill="#F20A8A" />
          <Rect x="108" y="48" width="20" height="32" fill="#F20A8A" />
          <Rect x="108" y="108" width="20" height="20" fill="#F20A8A" />
          <Rect x="0" y="108" width="20" height="20" fill="#F20A8A" />
          <Rect x="20" y="128" width="40" height="20" fill="#F20A8A" />
          <Rect x="80" y="128" width="68" height="20" fill="#F20A8A" />
          <Rect x="168" y="108" width="20" height="40" fill="#F20A8A" />
          <Rect x="188" y="108" width="20" height="20" fill="#F20A8A" />
          <Rect x="228" y="108" width="20" height="40" fill="#F20A8A" />
          <Rect x="108" y="158" width="20" height="40" fill="#F20A8A" />
          <Rect x="128" y="178" width="40" height="20" fill="#F20A8A" />
          <Rect x="168" y="158" width="68" height="20" fill="#F20A8A" />
          <Rect x="148" y="198" width="20" height="20" fill="#F20A8A" />
          <Rect x="188" y="178" width="48" height="20" fill="#F20A8A" />
          <Rect x="208" y="198" width="28" height="20" fill="#F20A8A" />
          <Rect x="108" y="218" width="40" height="20" fill="#F20A8A" />
          <Rect x="128" y="238" width="20" height="18" fill="#F20A8A" />
          <Rect x="228" y="238" width="28" height="18" fill="#F20A8A" />
        </Svg>
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoWrap: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.4,
  },
});
