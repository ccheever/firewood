import { TID } from "@atproto/common-web";
import * as Status from "@/lexicon/types/app/ocho/status";
import { Agent } from "@atproto/api";
import { err, ok } from "neverthrow";

export const updateStatus = async (agent: Agent, status: string) => {
  if (!agent) {
    return err("Agent not found");
  }

  const rkey = TID.nextStr();
  const record = {
    $type: "app.ocho.status",
    status,
    createdAt: new Date().toISOString(),
  };
  if (!Status.validateRecord(record).success) {
    return err("Invalid status record");
  }

  // Write the status record to the user's repository
  const res = await agent.com.atproto.repo
    .putRecord({
      repo: agent.assertDid,
      collection: "app.ocho.status",
      rkey,
      record,
      validate: false,
    })
    .catch((err) => {
      console.error("Error updating status:", err);
      return null;
    });

  if (!res) {
    return err("Failed to update status");
  }

  const uri = res.data.uri;

  console.log("Status updated:", uri);

  return ok();
};
