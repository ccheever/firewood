import { ConfigPlugin, withPlugins } from '@expo/config-plugins';
import withAndroidLynx from './android/withAndroidLynx';
import withIosLynx from './ios/withIosLynx';

const withExpoLynx: ConfigPlugin = (config) => {
  return withPlugins(config, [
    withAndroidLynx,
    withIosLynx,
  ]);
};

export default withExpoLynx; 
