import { TID } from "@atproto/common-web";
import * as Service from "@/lexicon/types/app/ocho/plugin/service";
import { Agent } from "@atproto/api";

export const getPluginDefinition = async (agent: Agent) => {
  if (!agent) {
    throw new Error("Agent not found");
  }

  const res = await agent.com.atproto.repo.getRecord({
    repo: agent.assertDid,
    collection: "app.ocho.plugin.service",
    rkey: "self",
  });

  const record = res.data;

  if (!record || !Service.validateRecord(record).success) {
    throw new Error("Invalid plugin definition");
  }

  return record;
};

export const enablePlugin = async (agent: Agent) => {
  const record = {
    $type: "app.ocho.plugin.service",
    createdAt: new Date().toISOString(),
  };

  if (!Service.validateRecord(record).success) {
    console.log("Invalid plugin record", record);
    throw new Error("Invalid service record");
  }

  const existing = await getPluginDefinition(agent).catch(() => undefined);

  if (existing) {
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
};

export const disablePlugin = async (agent: Agent) => {
  agent.com.atproto.repo.deleteRecord({
    repo: agent.assertDid,
    collection: "app.ocho.plugin.service",
    rkey: "self",
  });
};
