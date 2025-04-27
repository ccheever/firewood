import {
  type SnackConfig,
  type SnackState,
  defaultSnackModules,
  SnackRuntimeProvider,
  SnackRuntime,
  SnackApiCode,
} from "snack-runtime";

const config: SnackConfig = {
  modules: {
    // Inherit the default set of modules from Snack
    ...defaultSnackModules,
  },
};

export default function PluginDisplay({
  snackCode,
}: {
  snackCode: SnackApiCode;
}) {
  return (
    <SnackRuntimeProvider config={config}>
      {/* @ts-expect-error Error in typing of the SnackRuntime */}
      <SnackRuntime
        snackCode={snackCode}
        snackUrl={`exp://u.expo.dev/933fd9c0-1666-11e7-afca-d980795c5824?runtime-version=exposdk%3A52.0.0&channel-name=production&snack=%40elioth%2Fgrounded-orange-yogurt&snack-channel=VfQpfo8eyY`}
      />
    </SnackRuntimeProvider>
  );
}
