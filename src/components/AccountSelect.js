import { useState, useEffect } from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

const AccountSelect = ({
  customerId,
  setSelectedAccount,
  lable,
  productidFilter,
  filterOprator,
}) => {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const getAccounts = async (id) => {
    const response = await fetch(`/api/accounts?stakeholder_id=${id}`);
    const jsonData = await response.json();
    const filterList = filterAccountList(jsonData?.accounts || []);
    console.log(filterList);
    setAccounts(filterList);
  };
  const filterAccountList = (accList) => {
    let list = [];
    if (filterOprator && filterOprator == "equal") {
      list = accList.filter((acc) => acc.product_id === productidFilter);
    } else {
      list = accList.filter((acc) => acc.product_id !== productidFilter);
    }

    return list;
  };
  useEffect(() => {
    customerId && getAccounts(customerId);
  }, [customerId]);
  const changeHandler = (event) => {
    const value = event.target.value;
    setAccount(value);
    setSelectedAccount(value);
  };
  const id = lable.replace(/\s+/g, "_");
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{lable}</InputLabel>
      <Select
        labelId={id}
        id={{ id } + "-select"}
        value={account}
        label={lable}
        onChange={changeHandler}
      >
        {accounts.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default AccountSelect;
