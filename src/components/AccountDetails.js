import { Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AccountDetails = ({ title, account }) => {
  console.log("AccountDetails::", account);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const renderGridItem = (key, value) => {
    if (!value) return null;
    return (
      <>
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          sx={{ textAlign: matches ? "letf" : "center" }}
        >
          <Typography variant="h6">{key}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          sx={{ textAlign: matches ? "left" : "center" }}
        >
          <Typography>{value}</Typography>
        </Grid>
      </>
    );
  };
  if (!account) return null;
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 0,
        mb: 1,
        textAlign: matches ? "left" : "center",
        padding: ".4rem",
        borderTop: ".3rem solid",
        borderTopColor: "#0D497C",
      }}
    >
      <Typography
        sx={{
          color: "primary",
          textAlign: matches ? undefined : "center",
          pb: "1.5rem",
        }}
        variant="h5"
        gutterBottom
      >
        {title}
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ pb: "1.5rem" }}>
        {renderGridItem("Error", account.code ? account.message : "")}
        {renderGridItem(
          "Customer ID",
          account.stakeholder_ids ? account.stakeholder_ids[0] : ""
        )}
        {renderGridItem("Account ID", account.id)}
        {renderGridItem("Account Type", account.name)}
        {renderGridItem("Account Status", account.status)}
        {renderGridItem(
          "Account Opening Date",
          new Date(account.opening_timestamp).toLocaleString()
        )}
        {renderGridItem("Time Period", account.instance_param_vals?.term)}
        {renderGridItem(
          "Time Period Unit",
          account.instance_param_vals?.term_unit
        )}
        {renderGridItem(
          "Interest Rate",
          account.instance_param_vals?.gross_interest_rate
        )}
        {renderGridItem(
          "Interest Payout",
          account.instance_param_vals?.interest_application_frequency
        )}
        {renderGridItem(
          "Maturity Account ID",
          account.details?.maturity_vault_account_id
        )}
      </Grid>
    </Paper>
  );
};
export default AccountDetails;
