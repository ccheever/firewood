import { TID } from "@atproto/common-web";
import * as Code from "@/lexicon/types/app/ocho/plugin/code";
import { Agent } from "@atproto/api";

export const updateCode = async (agent: Agent, data: string) => {
  if (!agent) {
    throw new Error("Agent not found");
  }

  const rkey = TID.nextStr();
  const record = {
    $type: "app.ocho.plugin.code",
    data,
    createdAt: new Date().toISOString(),
  };
  if (!Code.validateRecord(record).success) {
    throw new Error("Invalid status record");
  }

  // Write the status record to the user's repository
  const res = await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: "app.ocho.plugin.code",
    rkey,
    record,
    validate: false,
  });
  const uri = res.data.uri;

  console.log("Code updated:", uri);
};
