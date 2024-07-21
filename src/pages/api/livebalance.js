export default async function handler(req, res) {
  const { account_ids } = req.query;
  const url = `https://core-api.partner-shared-sandbox.tmachine.io/v1/balances/live?account_ids=${account_ids}&account_addresses=DEFAULT&page_size=10`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "X-Auth-Token":
        "A0002272390145150676558!LxbGmUBhBdm5b/Pqqbq6mf3wnFk3nolj/OFIPHabA7/i7RqVykkik2I1j5OP94/KgjSqD5icYxbvVXMncbgYhbXvAMA=",
    },
  };
  const response = await fetch(url, options);
  const jsonData = await response.json();

  res.status(200).json(jsonData);
}
