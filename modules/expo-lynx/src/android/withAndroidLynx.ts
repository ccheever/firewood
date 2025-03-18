import { ConfigPlugin, withAndroidManifest } from '@expo/config-plugins';

const withAndroidLynx: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    
    // Add necessary permissions
    if (!androidManifest.manifest['uses-permission']) {
      androidManifest.manifest['uses-permission'] = [];
    }

    const permissions = [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
    ];

    permissions.forEach((permission) => {
      if (!androidManifest.manifest['uses-permission'].some((p: any) => p.$?.name === permission)) {
        androidManifest.manifest['uses-permission'].push({
          $: { name: permission },
        });
      }
    });

    return config;
  });
};

export default withAndroidLynx; 