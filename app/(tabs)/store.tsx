import * as Updates from "expo-updates";
import {
  type SnackConfig,
  type SnackState,
  defaultSnackModules,
  SnackRuntimeProvider,
  SnackRuntime,
} from "snack-runtime";

const config: SnackConfig = {
  modules: {
    // Inherit the default set of modules from Snack
    ...defaultSnackModules,
  },
};

function Snack() {
  return (
    <SnackRuntimeProvider config={config}>
      <SnackRuntime
        onSnackState={onStateChange}
        onSnackReload={onReloadRequested}
        snackUrl={`exp://u.expo.dev/933fd9c0-1666-11e7-afca-d980795c5824?runtime-version=exposdk%3A52.0.0&channel-name=production&snack=%40elioth%2Fgrounded-orange-yogurt&snack-channel=Ekz7XKyp3c`}
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
  console.log("Snack state changed:", state);
  if (state === "loading") console.log("Snack is initializing the code...");
  if (state === "finished") console.log("Snack is ready and rendered!");
  if (state === "error")
    console.error("Snack failed to initialize, check the logs for more info.");
  if (state === "not-found")
    console.error(
      "Snack failed to initialize by snack identifier, Snack not found",
    );
}

export default function HomeScreen() {
  return <Snack />;
}
