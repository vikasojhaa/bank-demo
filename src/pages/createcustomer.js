import Head from "next/head";
import { Grid, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Customer from "@/components/Customer";

const CreateCustomer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Head>
        <title>Create Customer</title>
        <meta name="description" content="Create Customer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container justifyContent="center" sx={{ px: matches ? 2 : 0 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{
              color: "primary",
              textAlign: matches ? "left" : "center",
            }}
            variant="h5"
            gutterBottom
          >
            Create Customer
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{ borderColor: "#BCBDC0", marginBottom: "10px" }}
            pl={5}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Customer />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateCustomer;
