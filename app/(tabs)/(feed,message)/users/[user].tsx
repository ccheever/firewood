import { ThemedText } from "@/components/ThemedText";
import { getPluginDefinition } from "@/lib/plugin";
import { useAuth } from "@/state/auth";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Service from "@/lexicon/types/app/ocho/plugin/service";
import * as Code from "@/lexicon/types/app/ocho/plugin/code";
import { getCode } from "@/lib/plugin/code";
import { ResultAsync } from "neverthrow";

export default function HomeLayout() {
  const { user } = useLocalSearchParams();
  const [userInfo, setUserInfo] = useState<Service.Record | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("Unknown Error");
  const [code, setCode] = useState<Code.Record | null>(null);
  const { agent } = useAuth();

  useEffect(() => {
    if (!agent) {
      setLoading(false);
      setError("Agent not found");
      return;
    }
    if (typeof user !== "string") {
      setLoading(false);
      setError("Invalid user");
      return;
    }
    (async () => {
      const resolveHandle = ResultAsync.fromThrowable(
        agent.resolveHandle,
        (e) => {
          console.log("Error resolving handle:", e);
          return "Error resolving handle";
        },
      );

      const resolved = await resolveHandle({
        handle: user,
      });

      if (!resolved.isOk()) {
        setError(resolved.error);
        setLoading(false);
        return;
      }

      const { data } = resolved.value;

      const pluginDefinition = await getPluginDefinition(agent, data.did);

      if (pluginDefinition.isErr()) {
        setError(pluginDefinition.error);
        setLoading(false);
        return;
      }

      setUserInfo(pluginDefinition.value);

      const codeRecord = await getCode(agent, data.did);

      if (!codeRecord.isOk()) {
        setError(codeRecord.error);
        setLoading(false);
        return;
      }

      setCode(codeRecord.value);
      setLoading(false);
    })();
  }, []);

  return (
    <View className="p-4">
      <Stack.Screen
        options={{
          title: `User: ${user}`,
        }}
      />
      {!loading ? (
        userInfo ? (
          <View>
            <ThemedText>Created at {userInfo.createdAt}</ThemedText>
            <ThemedText>{code?.data}</ThemedText>
          </View>
        ) : (
          <ThemedText>{error}</ThemedText>
        )
      ) : (
        <ThemedText>Loading...</ThemedText>
      )}
    </View>
  );
}
