import { TID } from "@atproto/common-web";
import * as Code from "@/lexicon/types/app/ocho/plugin/code";
import { Agent } from "@atproto/api";
import { err, ok } from "neverthrow";

export const updateCode = async (agent: Agent, data: string) => {
  if (!agent) {
    return err("Agent not found");
  }

  const rkey = TID.nextStr();

  const record = {
    $type: "app.ocho.plugin.code",
    data,
    createdAt: new Date().toISOString(),
  };

  if (!Code.validateRecord(record).success) {
    console.log("Invalid code record");
    return err("Invalid code record");
  }

  const res = await agent.com.atproto.repo
    .putRecord({
      repo: agent.assertDid,
      collection: "app.ocho.plugin.code",
      rkey,
      record,
      validate: false,
    })
    .catch((err) => {
      console.log("Error updating code", err);
      return null;
    });

  if (!res) {
    console.log("Error updating code");
    return err("Error updating code");
  }

  return ok();
};

export const getCode = async (agent: Agent, did?: string) => {
  if (!agent) {
    console.log("Agent not found");
    return err("Agent not found");
  }

  const res = await agent.com.atproto.repo
    .listRecords({
      repo: did ?? agent.assertDid,
      collection: "app.ocho.plugin.code",
    })
    .catch((err) => {
      return null;
    });

  if (!res) {
    console.log("Error fetching code");
    return err("Error fetching code");
  }

  const record = res?.data;

  if (!record) {
    console.log("No plugin definition found");
    return err("No plugin definition found");
  }

  if (!record.records.length) {
    console.log("No code found");
    return err("No code found");
  }

  // get first record
  const firstRecord = record.records[0];

  if (!firstRecord) {
    console.log("No code found");
    return err("No code found");
  }

  return ok(firstRecord.value as Code.Record);
};
