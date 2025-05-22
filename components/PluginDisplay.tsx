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
    ...defaultSnackModules,
    // Only works when vendored into the runtime (expo-router@1.5.3)
    "expo-router": require("expo-router"),
    "expo-router/stack": require("expo-router/stack"),
    "expo-router/tabs": require("expo-router/tabs"),
    "expo-router/drawer": require("expo-router/drawer"),
    "expo-router/html": require("expo-router/html"),
    "expo-router/head": require("expo-router/head"),
    "expo-router/entry": () => {}, // noop
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
      <SnackRuntime snackCode={snackCode} />
    </SnackRuntimeProvider>
  );
}
