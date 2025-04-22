import * as WebBrowser from "expo-web-browser";
import { Button, Platform, View } from "react-native";
import { useAuth } from "@/state/auth";
import { ThemedText } from "./ThemedText";

// WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const auth = useAuth();

  return auth.isLoggedIn ? (
    <View>
      <ThemedText>Welcome, {auth.user.value.displayName}</ThemedText>
      <Button
        title="Logout"
        onPress={() => {
          auth.logout();
        }}
      />
    </View>
  ) : (
    <View>
      <ThemedText>Login to see your profile</ThemedText>
      <Button
        title="Login"
        onPress={() => {
          auth.login();
        }}
      />
    </View>
  );
}
