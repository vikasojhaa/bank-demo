import { guid } from "@/utils/helper";

export default async function handler(req, res) {
  const url = `https://core-api.partner-shared-sandbox.tmachine.io/v1/customers`;
  const headers = {
    "content-type": "application/json",
    "X-Auth-Token":
      "A0002272390145150676558!LxbGmUBhBdm5b/Pqqbq6mf3wnFk3nolj/OFIPHabA7/i7RqVykkik2I1j5OP94/KgjSqD5icYxbvVXMncbgYhbXvAMA=",
  };
  if (req.method === "GET") {
    const { customerId, username, email, phone } = req.query;
    const getOptions = {
      method: "GET",
      headers: headers,
    };
    let getUrl = `${url}?statuses=CUSTOMER_STATUS_ACTIVE&username_identifiers=${username}&email_identifiers=${email}&phone_identifiers=%2B${phone}&page_size=10`;
    if (customerId) getUrl = `${url}/${customerId}`;
    const getResponse = await fetch(getUrl, getOptions);
    const customerDetails = await getResponse.json();
    res.status(200).json(customerDetails);
  }
  if (req.method === "POST") {
    const {
      customerId,
      first_name,
      middle_name,
      last_name,
      dob,
      gender,
      nationality,
      email_address,
      mobile_phone_number,
      home_phone_number,
      business_phone_number,
      country_of_residence,
      country_of_taxation,
    } = JSON.parse(req.body);
    const payload = {
      request_id: guid(),
      customer: {
        id: customerId,
        status: "CUSTOMER_STATUS_ACTIVE",
        identifiers: [
          {
            identifier_type: "IDENTIFIER_TYPE_EMAIL",
            identifier: email_address,
          },
          {
            identifier_type: "IDENTIFIER_TYPE_USERNAME",
            identifier: `${first_name}_${last_name}`, //TODO need to check
          },
          {
            identifier_type: "IDENTIFIER_TYPE_PHONE",
            identifier: "+" + mobile_phone_number,
          },
        ],
        customer_details: {
          title: "CUSTOMER_TITLE_MR",
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          dob: dob,
          gender: gender,
          nationality: nationality,
          email_address: email_address,
          mobile_phone_number: "+" + mobile_phone_number,
          home_phone_number: home_phone_number ? "+" + home_phone_number : "",
          business_phone_number: business_phone_number
            ? "+" + business_phone_number
            : "",
          contact_method: "CUSTOMER_CONTACT_METHOD_EMAIL",
          country_of_residence: country_of_residence,
          country_of_taxation: country_of_taxation,
          accessibility: "CUSTOMER_ACCESSIBILITY_LARGE_PRINT",
          external_customer_id: "b40ebe67-fbcd-4388-65b5-b1e3f3cf65d8", //TODO need to check
        },
        additional_details: {
          key1: "value1",
        },
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
