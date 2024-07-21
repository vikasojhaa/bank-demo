import { useState } from "react";
import Head from "next/head";
import { Grid, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountSearch from "@/components/AccountSearch";
import AccountDetails from "@/components/AccountDetails";

const Accounts = () => {
  const [account, setAccount] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Head>
        <title>Search Account</title>
        <meta name="description" content="Search Account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        sx={{ pt: 2, px: matches ? 2 : 0 }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{
              color: "primary",
              textAlign: matches ? "left" : "center",
            }}
            variant="h5"
            gutterBottom
          >
            Account Search
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{ borderColor: "#BCBDC0", marginBottom: "10px" }}
            pl={5}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AccountSearch setAccount={setAccount} />
        </Grid>
        {account && (
          <Grid item xs={12} md={12} lg={12}>
            <AccountDetails account={account} title="Account Details" />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default Accounts;
