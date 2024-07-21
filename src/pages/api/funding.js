import { guid } from "@/utils/helper";

export default async function handler(req, res) {
  const url =
    "https://core-api.partner-shared-sandbox.tmachine.io/v1/posting-instruction-batches:asyncCreate";
  const headers = {
    "content-type": "application/json",
    "X-Auth-Token":
      "A0002272390145150676558!LxbGmUBhBdm5b/Pqqbq6mf3wnFk3nolj/OFIPHabA7/i7RqVykkik2I1j5OP94/KgjSqD5icYxbvVXMncbgYhbXvAMA=",
  };
  if (req.method === "POST") {
    const { amount, fundingAccount, tdAccount } = JSON.parse(req.body);
    const payload = {
      request_id: guid(),
      posting_instruction_batch: {
        client_id: "AsyncCreatePostingInstructionBatch",
        client_batch_id: guid(),
        posting_instructions: [
          {
            client_transaction_id: guid(),
            custom_instruction: {
              postings: [
                {
                  credit: false,
                  amount: amount,
                  denomination: "GBP",
                  account_id: fundingAccount,
                  account_address: "DEFAULT",
                  asset: "COMMERCIAL_BANK_MONEY",
                  phase: "POSTING_PHASE_COMMITTED",
                },
                {
                  credit: true,
                  amount: amount,
                  denomination: "GBP",
                  account_id: tdAccount,
                  account_address: "DEFAULT",
                  asset: "COMMERCIAL_BANK_MONEY",
                  phase: "POSTING_PHASE_COMMITTED",
                },
              ],
            },
            pics: [],
            instruction_details: {},
          },
        ],
        batch_details: {},
        value_timestamp: new Date().toISOString(),
      },
    };
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    res.status(200).json(jsonData);
  }
  if (req.method === "GET") {
    const { transactionId } = req.query;
    const getOptions = {
      method: "GET",
      headers: headers,
    };
    const statusUrl = `https://core-api.partner-shared-sandbox.tmachine.io/v1/posting-instruction-batches/async-operations:batchGet?ids=${transactionId}`;
    const statusresponse = await fetch(statusUrl, getOptions);
    const statusresponsejsonData = await statusresponse.json();
    console.log(statusresponsejsonData);
    res.status(200).json(statusresponsejsonData);
  }
}
