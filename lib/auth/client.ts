import {
  ClientMetadata,
  ReactNativeOAuthClient,
} from "@aquareum/atproto-oauth-client-react-native";

const url = "https://5102-171-66-13-127.ngrok-free.app";

export const metadata: ClientMetadata = {
  client_id: `${url}/client-metadata.json`,
  client_name: "My Test App",
  client_uri: `${url}`,
  redirect_uris: [`${url}/atproto-oauth-callback`],
  scope: "atproto transition:generic",
  grant_types: ["authorization_code", "refresh_token"],
  response_types: ["code"],
  application_type: "native",
  token_endpoint_auth_method: "none",
  dpop_bound_access_tokens: true,
};

export const oauthClient = new ReactNativeOAuthClient({
  handleResolver: "https://bsky.social/xrpc/com.atproto.handle.resolve",
  clientMetadata: metadata,
});
