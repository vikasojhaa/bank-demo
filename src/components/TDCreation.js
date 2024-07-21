import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountDetails from "@/components/AccountDetails";
import AccountSelect from "@/components/AccountSelect";
import CustomerDetails from "@/components/CustomerDetails";

const TDCreation = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [depositPeriod, setDepositPeriod] = useState("");
  const [depositUnit, setDepositUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [productId, setProductId] = useState("");
  const [interestPayout, setInterestPayout] = useState("");
  const [maturityVaultAccountId, setMaturityVaultAccountId] = useState("");
  const [fundingAccount, setFundingAccount] = useState("");
  const [tdAccountId, setTdAccountId] = useState("");
  const [balance, setBalance] = useState("");
  const [TDRes, setTDRes] = useState(false);
  const [fundingRes, setFundingRes] = useState(false);


  const [errors, setErrors] = useState({})
  const [fieldError, setFieldError] = useState(false)

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
    if (jsonData?.balances?.length > 0) {
      const filterBalances = jsonData.balances.filter(
        (balance) =>
          balance.asset === "COMMERCIAL_BANK_MONEY" &&
          balance.phase === "POSTING_PHASE_COMMITTED" &&
          balance.denomination === "GBP"
      );
      const ammont =
        filterBalances?.length > 0
          ? `Balance: GBP ${filterBalances[0].amount}`
          : "";
      setBalance(ammont);
    }
  };
  const cancelHandler = () => {
    location.reload();
    /*setSelectedCustomer(null);
    setDepositPeriod("");
    setDepositUnit("");
    setAmount("");
    setProductId("");
    setInterestPayout("");
    setMaturityVaultAccountId("");
    setFundingAccount("");
    setTdAccountId("");
    setBalance("");
    setTDRes(null);
    setFundingRes(null);
    */
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    let error = {};
    // debugger;
    if (!amount) {
      error["amount"] = true;
      formIsValid = false;
      errors["amount"] = "Cannot be empty";
    } else {
      console.log("first")
      error["amount"] = false;
      console.log(error)
    }

    if (!depositPeriod) {
      error["depositPeriod"] = true;
      formIsValid = false;
      errors["depositPeriod"] = "Cannot be empty";
    } else {
      error["depositPeriod"] = false;
    }

    if (!depositUnit) {
      error["depositUnit"] = true;
      formIsValid = false;
      errors["depositUnit"] = "Cannot be empty";
    } else {
      error["depositUnit"] = false;
    }
    if (!productId) {
      error["productId"] = true;
      formIsValid = false;
      errors["productId"] = "Cannot be empty";
    } else {
      error["productId"] = false;
    }
    if (!interestPayout) {
      error["interestPayout"] = true;
      formIsValid = false;
      errors["interestPayout"] = "Cannot be empty";
    } else {
      error["interestPayout"] = false;
    }

    if (!maturityVaultAccountId) {
      error["maturityVaultAccountId"] = true;
      formIsValid = false;
      errors["maturityVaultAccountId"] = "Cannot be empty";
    } else {
      error["maturityVaultAccountId"] = false;
    }
    if (!fundingAccount) {
      error["fundingAccount"] = true;
      formIsValid = false;
      errors["fundingAccount"] = "Cannot be empty";
    } else {
      error["fundingAccount"] = false;
    }
    if (!tdAccountId) {
      error["tdAccountId"] = true;
      formIsValid = false;
      errors["tdAccountId"] = "Cannot be empty";
    } else {
      error["interestPayout"] = false;
    }
    setErrors({ errors: errors });
    setFieldError({ error: error })
    return formIsValid;
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    setFundingRes(null);
    setTDRes(null);
    if (handleValidation()) {
    const tdRes = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({
        ...selectedCustomer,
        amount,
        depositPeriod,
        depositUnit,
        productId,
        interestPayout,
        maturityVaultAccountId,
        accountNo: tdAccountId,
      }),
    });
    const tdJsonData = await tdRes.json();
    setTDRes(tdJsonData);

    if (tdJsonData?.id) {
      const fundingRes = await fetch("/api/funding", {
        method: "POST",
        body: JSON.stringify({
          tdAccount: tdJsonData.id,
          amount,
          fundingAccount,
        }),
      });
      const fundingJsonData = await fundingRes.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (fundingJsonData?.id) {
        const status = await fetch(
          `/api/funding?transactionId=${fundingJsonData?.id}`
        );
        const statusJsonData = await status.json();
        const posting_instructions =
          statusJsonData?.async_operations[fundingJsonData.id]?.response
            ?.posting_instructions;
        const committed_postings =
          posting_instructions && posting_instructions.length > 0
            ? posting_instructions[0].committed_postings
            : [];

        const contract_violations =
          posting_instructions && posting_instructions.length > 0
            ? posting_instructions[0].contract_violations
            : [];

        setFundingRes({
          funded: committed_postings.length > 0,
          message:
            contract_violations.length > 0 ? contract_violations[0].reason : "",
        });
      }
    }
  }
  };
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          py: matches ? 1 : 1,
          mb: 2,
          textAlign: "left",
          padding: ".2rem",
        }}
      >
        <CustomerDetails handleSelectedCustomer={setSelectedCustomer} />
        <Grid container justifyContent={"space-around"} spacing={1}>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="productid"
              error={fieldError && fieldError.error && fieldError.error.productId}
              >Product ID</InputLabel>
              <Select
                labelId="productid"
                id="productid-select"
                value={productId}
                error={fieldError && fieldError.error && fieldError.error.productId}
                label="Product ID"
                onChange={(event) => setProductId(event.target.value)}
              >
                <MenuItem value="time_deposit">Time Deposit</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.productId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="depositUnit"
               error={fieldError && fieldError.error && fieldError.error.depositUnit}
               >Deposit Period Unit</InputLabel>
              <Select
                labelId="depositUnit"
                id="depositUnit-select"
                value={depositUnit}
                label="Deposit Period Unit"
                error={fieldError && fieldError.error && fieldError.error.depositUnit}
                onChange={(event) => setDepositUnit(event.target.value)}
              >
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="months">Months</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.depositUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                id="duration"
                label="Deposit Period"
                type="number"
                variant="outlined"
                value={depositPeriod}
                error={fieldError && fieldError.error && fieldError.error.depositPeriod}
                onChange={(event) => setDepositPeriod(event.target.value)}
              />
            </FormControl>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.depositPeriod}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="interestPayout"
              error={fieldError && fieldError.error && fieldError.error.interestPayout}
              >Interest Payout Freq</InputLabel>
              <Select
                labelId="interestPayout"
                id="depositUnit-select"
                value={interestPayout}
                label="Interest Payout Freq"
                error={fieldError && fieldError.error && fieldError.error.interestPayout}
                onChange={(event) => setInterestPayout(event.target.value)}
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="fortnightly">fortnightly</MenuItem>
                <MenuItem value="four_weekly">four_weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="semi_annually">semi_annually</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
                <MenuItem value="maturity">Maturity</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.interestPayout}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={12} lg={3}>
            <AccountSelect
              customerId={customerId}
              setSelectedAccount={setFundingAccount}
              lable={"Funding Account"}
              productidFilter="time_deposit"
              error={fieldError && fieldError.error && fieldError.error.fundingAccount}
            />
            <Typography
              sx={{
                color: "#61a95c",
              }}
              variant="caption"
              gutterBottom
            >
              {balance}
            </Typography>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.fundingAccount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <AccountSelect
              customerId={customerId}
              setSelectedAccount={setMaturityVaultAccountId}
              lable={"Maturity Account"}
              productidFilter="time_deposit"
              error={fieldError && fieldError.error && fieldError.error.maturityVaultAccountId}
            />
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.maturityVaultAccountId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                id="TDAccountId"
                label="TD Account No"
                type="number"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 8);
                }}
                min={0}
                variant="outlined"
                value={tdAccountId}
                onChange={(event) => setTdAccountId(event.target.value)}
                error={fieldError && fieldError.error && fieldError.error.tdAccountId}
                />
            </FormControl>
            <Typography variant="inherit" color="error">
                  {errors && errors.errors && errors.errors.tdAccountId}
                </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                id="amount"
                label="Amount"
                type="number"
                variant="outlined"
                value={amount}
                error={fieldError && fieldError.error && fieldError.error.amount}
                onChange={(event) => setAmount(event.target.value)}
                // sx={{ width: "17.4rem" }}
              />
            </FormControl>
            <Typography variant="inherit" color="error">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ mt: 2, mb: 2 }}
        >
          <Grid item xs={12} md={12} lg={4}>
            <Stack spacing={2} direction="row">
              <Button
                className="temp-button"
                sx={{
                  p: "1rem",
                  minWidth: "10rem",
                  backgroundColor: "#0D497C",
                }}
                variant="contained"
                onClick={submitHandler}
              >
                Submit
              </Button>
              <Button
                className="temp-button-cancel"
                sx={{ p: "1rem", minWidth: "10rem" }}
                variant="outlined"
                onClick={cancelHandler}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {TDRes && (
          <Grid container spacing={1} sx={{ my: 3 }} justifyContent={"center"}>
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
                  ? `Term Deposit created succesfuly, Account Id: ${TDRes.id}.`
                  : `Error: ${TDRes.message}`}
              </Typography>
              {fundingRes && (
                <Typography
                  sx={{
                    color: fundingRes?.funded ? "#61a95c" : "#e13925",
                    textAlign: matches ? undefined : "center",
                  }}
                  variant="h6"
                  gutterBottom
                >
                  Funding status is
                  {fundingRes?.funded
                    ? " completed."
                    : fundingRes?.message
                    ? ` rejected (${fundingRes?.message}).`
                    : " initiated."}
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
      {TDRes?.id && (
        <AccountDetails title="Term Deposit Account Details" account={TDRes} />
      )}
    </>
  );
};
export default TDCreation;
