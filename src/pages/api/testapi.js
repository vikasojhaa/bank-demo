export default async function handler(req, res) {
  //const { account_ids } = req.query;
  const url = `https://forms.office.com/formapi/api/b727a530-a0d5-4fb8-bd40-d8f9763e97db/users/b1a2f48c-7e93-4be9-b507-88f170813d41/forms('MKUnt9WguE-9QNj5dj6X24z0orGTfulLtQeI8XCBPUFUNjlPRzkyVkY1VUdFNUVNOU5aR0g2R1BPQi4u')/responses?$expand=comments&$top=10&$skip=0`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      //"Authorization" = Bearer {token}
    },
  };
  const response = await fetch(url, options);
  const jsonData = await response.json();
  console.log("=====Test API url:", url);
  console.log("=====Test API Res========");
  console.log(jsonData);
  console.log("=====Test API Res End========");
  res.status(200).json(jsonData);
}
