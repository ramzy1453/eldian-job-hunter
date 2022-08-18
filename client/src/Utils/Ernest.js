export default async function Ernest(
  url,
  method = "GET",
  body = null,
  headers = null
) {
  const config =
    method === "GET"
      ? {
          method: "GET",
          headers: { "Content-Type": "application/json", ...headers },
        }
      : {
          method: method,
          headers: { "Content-Type": "application/json", ...headers },
          body: body && JSON.stringify(body),
        };
  const response = await fetch(url, config);
  return await response.json();
}
