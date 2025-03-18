import * as React from 'react';

import { ExpoLynxViewProps } from './ExpoLynx.types';

export default function ExpoLynxView(props: ExpoLynxViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
