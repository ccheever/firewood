import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';

const withIosLynx: ConfigPlugin = (config) => {
  return withInfoPlist(config, async (config) => {
    const infoPlist = config.modResults;

    // Add necessary permissions and configurations
    infoPlist.NSAppTransportSecurity = {
      NSAllowsArbitraryLoads: true,
    };

    return config;
  });
};

export default withIosLynx; 