import { TID } from "@atproto/common-web";
import * as Status from "@/lexicon/types/app/ocho/status";
import { useAuth } from "@/state/auth";

export const updateStatus = async (status: string) => {
  const { agent } = useAuth();

  if (!agent) {
    throw new Error("Agent not found");
  }

  const rkey = TID.nextStr();
  const record = {
    $type: "app.ocho.status",
    status,
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
