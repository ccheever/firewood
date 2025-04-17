import { Button, Platform, View } from "react-native";
import { useAuth } from "@/state/auth";
import { Agent } from "@atproto/api";
import { TID } from "@atproto/common-web";
import * as Status from "@/lexicon/types/app/ocho/status";

const updateStatus = async (agent: Agent, status: string) => {
  const rkey = TID.nextStr();
  const record = {
    $type: "app.ocho.status",
    status: "This is VERY exciting",
    createdAt: new Date().toISOString(),
  };
  if (!Status.validateRecord(record).success) {
    throw new Error("Invalid status record");
  }

  // Write the status record to the user's repository
  const res = await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: "app.ocho.status",
    rkey,
    record,
    validate: false,
  });
  const uri = res.data.uri;

  console.log("Status updated:", uri);
};

export default function StatusButton() {
  const auth = useAuth();

  return auth.isLoggedIn ? (
    <View>
      <Button
        title="Update status with a random number"
        onPress={async () => {
          // @ts-expect-error TODO: Fix this
          await updateStatus(auth.agent, Math.random().toString());
        }}
      />
    </View>
  ) : null;
}
