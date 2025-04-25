import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Feed",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="message"
        options={{
          title: "Message",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="users/[user]"
        getId={({ params }) => String(Date.now())}
      />
    </Stack>
  );
}
