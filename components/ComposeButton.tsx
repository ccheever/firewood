import { Button, Platform, View } from "react-native";
import { useCompose } from "@/state/compose";

export default function ComposeButton() {
  const { open, openCompose } = useCompose();

  return (
    <View>
      <Button
        title={open ? "Close compose" : "Open compose"}
        onPress={() => {
          console.log("Opening compose");
          openCompose();
        }}
      />
    </View>
  );
}
