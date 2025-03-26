// import { requireNativeView } from 'expo';
import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoLynxViewProps } from './ExpoLynx.types';

const NativeView: React.ComponentType<ExpoLynxViewProps> =
  requireNativeViewManager('ExpoLynx');

export default function ExpoLynxView(props: ExpoLynxViewProps) {
  return <NativeView {...props} />;
}
