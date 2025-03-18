import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './ExpoLynx.types';

type ExpoLynxModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class ExpoLynxModule extends NativeModule<ExpoLynxModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(ExpoLynxModule);
