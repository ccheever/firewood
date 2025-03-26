import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { ExpoLynxView } from '@/modules/expo-lynx';
import RenderLynxView from 'react-native-render-lynx';

export default function LynxScreen() {
  const bundleUrl = 'https://unpkg.com/@lynx-example/hello-world/dist/main.lynx.bundle';
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="text.justify"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lynx</ThemedText>
      </ThemedView>
      <ThemedText>Lynx will go here when it is ready.</ThemedText>
      <ExpoLynxView style={{ flex: 1, height: 300 }} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
