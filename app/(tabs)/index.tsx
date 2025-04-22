import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BaseView from "@/components/BaseView";
import data from "./data.json";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { View } from "react-native";
import LoginButton from "@/components/LoginButton";
import ComposeButton from "@/components/ComposeButton";
import { useAuth } from "@/state/auth";
import { useEffect } from "react";
import UpdatePluginButton from "@/components/UpdatePluginButton";

function Post({ item }: { item: (typeof data)[0] }) {
  return (
    <ThemedView className="gap-4 p-4 border-b border-b-neutral-200 dark:border-b-neutral-800 flex-row">
      {/* <Avatar /> */}
      <ThemedView className="flex-1">
        <ThemedText type="subtitle">{item.author}</ThemedText>
        <ThemedText>{item.content}</ThemedText>
        <ThemedView className="flex-row justify-between mt-3 items-center">
          <View className="flex-row gap-2 items-center">
            <IconSymbol name="heart" size={20} color="text" />
            <ThemedText>3</ThemedText>
          </View>
          <View className="flex-row gap-2 items-center">
            <IconSymbol name="repeat" size={20} color="text" />
            <ThemedText>3</ThemedText>
          </View>
          <View className="flex-row gap-2 items-center">
            <IconSymbol name="text.bubble" size={20} color="text" />
            <ThemedText>2</ThemedText>
          </View>
          <View />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

export default function HomeScreen() {
  return (
    <BaseView>
      <View className="h-full items-center justify-center">
        <LoginButton />
        <ComposeButton />
        <UpdatePluginButton />
      </View>
      {/* <LegendList */}
      {/*   className='flex-1 gap-4' */}
      {/*   estimatedItemSize={78} */}
      {/*   data={ */}
      {/*     data */}
      {/*   } */}
      {/*   renderItem={({ item }) => ( */}
      {/*     <Post */}
      {/*       item={item} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
    </BaseView>
  );
}
