import { guid } from "@/utils/helper";

export default async function handler(req, res) {
  const url = `https://core-api.partner-shared-sandbox.tmachine.io/v1/accounts`;
  const headers = {
    "content-type": "application/json",
    "X-Auth-Token":
      "A0002272390145150676558!LxbGmUBhBdm5b/Pqqbq6mf3wnFk3nolj/OFIPHabA7/i7RqVykkik2I1j5OP94/KgjSqD5icYxbvVXMncbgYhbXvAMA=",
  };
  if (req.method === "GET") {
    const { stakeholder_id } = req.query;
    const getOptions = {
      method: "GET",
      headers: headers,
    };
    const getResponse = await fetch(
      `${url}?stakeholder_id=${stakeholder_id}&page_size=10`,
      getOptions
    );
    const accountData = await getResponse.json();
    console.log(`${url}?stakeholder_id=${stakeholder_id}&page_size=10`);
    console.log("Res get account=============");
    console.log(accountData);
    console.log("Res get account=======END======");
    res.status(200).json(accountData);
  }
  if (req.method === "POST") {
    const {
      id,
      accountNo,
      depositPeriod,
      depositUnit,
      productId,
      interestPayout,
      maturityVaultAccountId,
    } = JSON.parse(req.body);
    const payload = {
      request_id: guid(), //"4568757e-85de-4985-aa8f-6dd86a52b456", //guid
      account: {
        id: accountNo,
        product_id: productId, //"time_deposit",
        permitted_denominations: ["GBP"],
        status: "ACCOUNT_STATUS_OPEN",
        opening_timestamp: new Date().toISOString(), // "2023-03-03T19:10:37.808587Z", //new Date().toUTCString() //currentUTCtime
        stakeholder_ids: [id], // ["96d96f96-7ba6-422e-9f41-f74d24e9b14b"], //customerid
        instance_param_vals:
          productId === "time_deposit"
            ? {
                account_closure_period: "7",
                auto_rollover_type: "no_rollover",
                cool_off_period: "0",
                deposit_period: "7",
                fee_free_percentage_limit: "0",
                grace_period: "0",
                gross_interest_rate: "0.149",
                interest_application_day: "1", //1-31 Interest Payout Date ddl
                interest_application_frequency: interestPayout, //"maturity", //Interest Payout:: weekly fortnightly four_weekly monthly quarterly semi_annually annually maturity
                partial_principal_amount: "0", //sanbox not req
                period_end_hour: "21",
                rollover_account_closure_period: "7",
                rollover_grace_period: "0",
                rollover_gross_interest_rate: "0.149",
                rollover_interest_application_day: "1",
                rollover_interest_application_frequency: "maturity",
                rollover_period_end_hour: "21",
                rollover_term: "24",
                rollover_term_unit: "months",
                term: depositPeriod, //"24", //duration count numbre
                term_unit: depositUnit, //"months", //unit of duration months/days
                withdrawal_fee: "0",
                withdrawal_percentage_fee: "0",
              }
            : {
                arranged_overdraft_limit: "100",
                autosave_savings_account: "",
                daily_atm_withdrawal_limit: "12",
                interest_application_day: "1",
                unarranged_overdraft_limit: "500",
              },
        derived_instance_param_vals: {},
        details:
          productId === "time_deposit"
            ? {
                interest_payment_destination: "retain_on_account",
                maturity_vault_account_id: maturityVaultAccountId, //"69caaa28-0f46-4b59-dc46-5680b5648a52", //ddl, id, Acount search api name != 'Time Deposit'
              }
            : null,
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
}
