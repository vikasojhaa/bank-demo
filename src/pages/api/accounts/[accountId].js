export default async function handler(req, res) {
  if (!req.query?.accountId)
    res.status(400).json({ error: "Please provide account id" });
  const url = `https://core-api.partner-shared-sandbox.tmachine.io/v1/accounts`;
  const headers = {
    "content-type": "application/json",
    "X-Auth-Token":
      "A0002272390145150676558!LxbGmUBhBdm5b/Pqqbq6mf3wnFk3nolj/OFIPHabA7/i7RqVykkik2I1j5OP94/KgjSqD5icYxbvVXMncbgYhbXvAMA=",
  };
  const getOptions = {
    method: "GET",
    headers: headers,
  };
  const getResponse = await fetch(`${url}/${req.query.accountId}`, getOptions);
  const accountData = await getResponse.json();
  res.status(200).json(accountData);
}
