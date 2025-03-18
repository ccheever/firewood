import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoLynxViewProps } from './ExpoLynx.types';

const NativeView: React.ComponentType<ExpoLynxViewProps> =
  requireNativeView('ExpoLynx');

export default function ExpoLynxView(props: ExpoLynxViewProps) {
  return <NativeView {...props} />;
}
