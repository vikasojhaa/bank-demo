import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountDetails from "@/components/AccountDetails";
import CustomerDetails from "@/components/CustomerDetails";

const CACreation = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [accountRes, setAccountRes] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const cancelHandler = () => {
    location.reload();
  };
  const submitHandler = async () => {
    setAccountRes(null);
    //client side validations
    const res = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({
        ...selectedCustomer,
        productId: "current_account",
        accountNo: accountNo,
      }),
    });
    const jsonData = await res.json();
    setAccountRes(jsonData);
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
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                id="accountNo"
                label="Account Number"
                type="number"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 8);
                }}
                min={0}
                variant="outlined"
                value={accountNo}
                onChange={(event) => setAccountNo(event.target.value)}
              />
            </FormControl>
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
        {accountRes && (
          <Grid container spacing={1} sx={{ my: 3 }} justifyContent={"center"}>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                sx={{
                  color: accountRes.id ? "#61a95c" : "#e13925",
                  textAlign: matches ? undefined : "center",
                }}
                variant="h6"
                gutterBottom
              >
                {accountRes.id
                  ? `Current account created succesfuly, Account Id: ${accountRes.id}.`
                  : `Error: ${accountRes.message}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
      {accountRes?.id && (
        <AccountDetails title="Current Account Details" account={accountRes} />
      )}
    </>
  );
};
export default CACreation;
