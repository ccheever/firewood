import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BaseView from '@/components/BaseView';
import { LegendList } from "@legendapp/list"
import data from "./data.json"
import { Avatar } from '@/components/Avatar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { View } from 'react-native';
import { Link } from 'expo-router';

function Post({
  item,
}: {
  item: typeof data[0]
}) {
  return (
    // TODO: This is a scaffolding, colors should be themed
    <Link href={`/post`}>
      <ThemedView className='gap-4 p-4 border-b dark:border-b-neutral-800 flex-row'>
        <Avatar />
        <ThemedView className='flex-1'>
          <ThemedText type="subtitle">{
            item.author
          }</ThemedText>
          <ThemedText>
            {item.content}
          </ThemedText>
          <ThemedView className='flex-row justify-between mt-3 items-center'>
            <View className='flex-row gap-2 items-center'>
              <IconSymbol
                name="heart"
                size={20}
                color="text"
              />
              <ThemedText>3</ThemedText>
            </View>
            <View className='flex-row gap-2 items-center'>
              <IconSymbol
                name="repeat"
                size={20}
                color="text"
              />
              <ThemedText>3</ThemedText>
            </View>
            <View className='flex-row gap-2 items-center'>
              <IconSymbol
                name="text.bubble"
                size={20}
                color="text"
              />
              <ThemedText>2</ThemedText>
            </View>
            <View />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Link>
  )
}

export default function HomeScreen() {
  return (
    <BaseView>
      <LegendList
        className='flex-1 gap-4'
        estimatedItemSize={78}
        data={
          data
        }
        renderItem={({ item }) => (
          <Post
            item={item}
          />
        )}
      />
    </BaseView>
  );
}
