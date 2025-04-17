const url = "https://5102-171-66-13-127.ngrok-free.app";

const metadata = {
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

export function GET(request: Request) {
  return Response.json(metadata);
}
