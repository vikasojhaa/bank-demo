import { useState } from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AccountSearch = ({ setAccount }) => {
  const [accountId, setAccountId] = useState([]);

  const getAccounts = async () => {
    if (accountId) {
      const response = await fetch(`/api/accounts/${accountId}`);
      const jsonData = await response.json();
      setAccount(jsonData);
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Account Details"
          inputProps={{ "aria-label": "search account details" }}
          value={accountId}
          onChange={(event) => {
            setAccountId(event.target.value);
          }}
          type="search"
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={getAccounts}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};
export default AccountSearch;
