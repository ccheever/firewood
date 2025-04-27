import { Button, KeyboardAvoidingView, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useCompose } from "@/state/compose";
import { useState } from "react";
import { useAuth } from "@/state/auth";
import { updateCode } from "@/lib/plugin/code";
import { fetchCodeBySnackIdentifier } from "snack-runtime";

export const ComposePost = () => {
  const { closeCompose } = useCompose();
  const { agent } = useAuth();
  const [text, setText] = useState("");

  if (!agent) {
    closeCompose();
    return <></>;
  }

  return (
    <View className="flex-1 p-4 gap-4">
      <View className="flex-row justify-between">
        <Button title="Close" onPress={closeCompose} />
        <Button
          title="Post"
          onPress={async () => {
            try {
              const code = await fetchCodeBySnackIdentifier(
                "@elioth/shallow-orange-scones",
              );
              console.log(code);
              if (code) {
                await updateCode(agent, JSON.stringify(code));
                setText("");
                closeCompose();
              } else {
                console.error("Failed to fetch code");
              }
            } catch (error) {
              console.error("Error posting plugin:", error);
            }
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1 gap-4">
          <ThemedText>Compose your plugin content here...</ThemedText>
          <TextInput
            autoFocus
            value={text}
            onChangeText={setText}
            multiline
            className="flex-1 border border-neutral-200 dark:border-neutral-800 p-4"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
