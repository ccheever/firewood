import * as WebBrowser from "expo-web-browser";
import { Button, Platform, View } from "react-native";
import { useAuth } from "@/state/auth";
import { ThemedText } from "./ThemedText";
import { disablePlugin, enablePlugin, getPluginDefinition } from "@/lib/plugin";
import { useEffect } from "react";

// WebBrowser.maybeCompleteAuthSession();

export default function UpdatePluginButton() {
  const { agent } = useAuth();

  if (!agent) return <></>;

  return (
    <View>
      <Button
        title="Enable Plugin"
        onPress={async () => {
          console.log("Enabling plugin");
          await enablePlugin(agent);
        }}
      />
      <Button
        title="Disable Plugin"
        onPress={async () => {
          console.log("Enabling plugin");
          await disablePlugin(agent);
        }}
      />
    </View>
  );
}
