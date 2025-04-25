import * as Service from "@/lexicon/types/app/ocho/plugin/service";
import { Agent } from "@atproto/api";
import { err, ok } from "neverthrow";

export const getPluginDefinition = async (agent: Agent, did?: string) => {
  if (!agent) {
    console.log("Agent not found");
    return err("Agent not found");
  }

  const res = await agent.com.atproto.repo
    .getRecord({
      repo: did ?? agent.assertDid,
      collection: "app.ocho.plugin.service",
      rkey: "self",
    })
    .catch((err) => {
      console.log("Error fetching plugin definition", err);
      return null;
    });

  if (!res) {
    console.log("Error fetching plugin definition");
    return err("Error fetching plugin definition");
  }

  const record = res?.data;

  if (!record) {
    console.log("No plugin definition found");
    return err("Plugin definition not found");
  }

  if (!Service.validateRecord(record.value).success) {
    console.log("Invalid plugin definition", record);
    return err("Invalid plugin definition");
  }

  return ok(record.value as Service.Record);
};

export const enablePlugin = async (agent: Agent) => {
  const record = {
    $type: "app.ocho.plugin.service",
    createdAt: new Date().toISOString(),
  };

  if (!Service.validateRecord(record).success) {
    console.log("Invalid plugin record", record);
    return err("Invalid plugin record");
  }

  const existing = await getPluginDefinition(agent);

  if (existing.isOk()) {
    const res = await agent.com.atproto.repo.putRecord({
      repo: agent.assertDid,
      collection: "app.ocho.plugin.service",
      rkey: "self",
      record,
      validate: false,
    });

    const uri = res.data.uri;
    console.log("Plugin updated:", uri);
  } else {
    // Write the status record to the user's repository
    const res = await agent.com.atproto.repo.createRecord({
      repo: agent.assertDid,
      collection: "app.ocho.plugin.service",
      rkey: "self",
      record,
      validate: false,
    });

    console.log("Plugin created:", res.data);

    const uri = res.data.uri;

    console.log("Plugin enabled:", uri);
  }

  return ok();
};

export const disablePlugin = async (agent: Agent) => {
  agent.com.atproto.repo.deleteRecord({
    repo: agent.assertDid,
    collection: "app.ocho.plugin.service",
    rkey: "self",
  });
};
