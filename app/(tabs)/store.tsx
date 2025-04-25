import * as Updates from "expo-updates";
import {
  type SnackConfig,
  type SnackState,
  defaultSnackModules,
  SnackRuntimeProvider,
  SnackRuntime,
} from "snack-runtime";
import BaseView from "@/components/BaseView";

const config: SnackConfig = {
  modules: {
    // Inherit the default set of modules from Snack
    ...defaultSnackModules,
  },
};

export function Snack() {
  return (
    <SnackRuntimeProvider config={config}>
      <SnackRuntime
        onSnackState={onStateChange}
        onSnackReload={onReloadRequested}
        snackUrl={`exp://u.expo.dev/933fd9c0-1666-11e7-afca-d980795c5824?runtime-version=exposdk%3A52.0.0&channel-name=production&snack=%40elioth%2Fgnarly-green-yogurt&snack-channel=JVBrMSJTcD`}
      />
    </SnackRuntimeProvider>
  );
}

// Requested through the Snack website
function onReloadRequested() {
  return Updates.reloadAsync();
}

// When the lifecycle of a Snack changes
function onStateChange(state: SnackState) {
  if (state === "loading") console.log("Snack is initializing the code...");
  if (state === "finished") console.log("Snack is ready and rendered!");
  if (state === "error")
    console.error("Snack failed to initialize, check the logs for more info.");
  if (state === "not-found")
    console.error(
      "Snack failed to initialize by snack identifier, Snack not found",
    );

  throw new Error(`Unexpected Snack state received "${state}"`);
}

export default function HomeScreen() {
  return (
    <BaseView>
      <Snack />
    </BaseView>
  );
}
