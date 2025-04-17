import { Button, KeyboardAvoidingView, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useCompose } from "@/state/compose";
import { useState } from "react";
import { updateStatus } from "@/lib/post";

export const ComposePost = () => {
  const { closeCompose } = useCompose();
  const [text, setText] = useState("");
  return (
    <View className="flex-1 p-4 gap-4">
      <View className="flex-row justify-between">
        <Button title="Close" onPress={closeCompose} />
        <Button
          title="Post"
          onPress={async () => {
            console.log("Posting:", text);
            await updateStatus(text);
            setText("");
            closeCompose();
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1 gap-4">
          <ThemedText>Compose your post here...</ThemedText>
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
