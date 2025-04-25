import BaseView from "@/components/BaseView";
import { View } from "react-native";
import LoginButton from "@/components/LoginButton";
import ComposeButton from "@/components/ComposeButton";
import UpdatePluginButton from "@/components/UpdatePluginButton";

export default function HomeScreen() {
  return (
    <BaseView>
      <View className="h-full items-center justify-center">
        <LoginButton />
        <ComposeButton />
        <UpdatePluginButton />
      </View>
    </BaseView>
  );
}
