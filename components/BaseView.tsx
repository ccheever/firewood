import type { PropsWithChildren, ReactElement } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';

type Props = PropsWithChildren<{}>;

export default function BaseView({
  children,
}: Props) {
  const bottom = useBottomTabOverflow();

  return (
    <ThemedView
      className='p-safe flex-1'
    >
      <ThemedView
        style={{
          paddingBottom: bottom,
        }}
      >
        {children}
      </ThemedView>
    </ThemedView>
  );
}


