export function GET(request: Request) {
  const redirectUrl = new URL("myapp://oauth-callback");
  // copy query params from request to redirectUrl
  const params = new URL(request.url).searchParams;
  params.forEach((value, key) => {
    redirectUrl.searchParams.append(key, value);
  });
  return Response.redirect(redirectUrl.toString(), 302);
}
