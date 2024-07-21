import { useState, useEffect } from "react";
import { Grid, Paper, Typography, TextField, Button, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountSelect from "@/components/AccountSelect";
import CustomerDetails from "@/components/CustomerDetails";

const Funding = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [tdAccount, setTdAccount] = useState("");
  const [fundingAccount, setFundingAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [TDRes, setTDRes] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const customerId = selectedCustomer?.id || "";

  useEffect(() => {
    getBalance();
  }, [fundingAccount]);

  const getBalance = async () => {
    //client side validations
    const response = await fetch(
      `/api/livebalance?account_ids=${fundingAccount}`
    );
    const jsonData = await response.json();
    setBalance(jsonData);
  };

  const submitHandler = async () => {
    //client side validations

    const fundingRes = await fetch("/api/funding", {
      method: "POST",
      body: JSON.stringify({
        tdAccount: tdAccount,
        amount,
        fundingAccount,
      }),
    });
    const fundingJsonData = await fundingRes.json();
    setTDRes(fundingJsonData);
  };
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          py: matches ? 1 : 0,
          mb: 2,
          textAlign: "center",
          padding: ".4rem",
        }}
      >
        <CustomerDetails handleSelectedCustomer={setSelectedCustomer} />

        <Grid container justifyContent={"space-around"} spacing={1}>
          <Grid item xs={12} md={12} lg={3}>
          <FormControl fullWidth>
            <TextField
              id="amount"
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              // sx={{ width: "17.4rem" }}
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
          <FormControl fullWidth>
            <AccountSelect
              customerId={customerId}
              setSelectedAccount={setFundingAccount}
              lable={"Funding Account"}
              productidFilter="time_deposit"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
          <FormControl fullWidth>
            <AccountSelect
              customerId={customerId}
              setSelectedAccount={setTdAccount}
              lable={"Term Deposit Account"}
              productidFilter="time_deposit"
              filterOprator="equal"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={3}></Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ m: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
            <Button
              className="temp-button"
              sx={{ p: "1rem", minWidth: "10rem", backgroundColor: "#0D497C" }}
              variant="contained"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {TDRes && (
          <Grid container spacing={1} sx={{ my: 5 }} justifyContent={"center"}>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                sx={{
                  color: TDRes.id ? "#61a95c" : "#e13925",
                  textAlign: matches ? undefined : "center",
                }}
                variant="h6"
                gutterBottom
              >
                {TDRes.id
                  ? `Term Deposit funded, Transaction Id: ${TDRes.id}`
                  : `Error: ${TDRes.message}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};
export default Funding;
