import Head from "next/head";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider, Typography } from "@mui/material";
import CustomerSearchWidget from "@/components/CustomerSearchWidget";

export default function Dashboard() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Head>
        <title>Test Bank</title>
        <meta name="description" content="Test Bank" />
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
            Customer Search
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{ borderColor: "#BCBDC0", marginBottom: "10px" }}
            pl={5}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <CustomerSearchWidget />
        </Grid>
      </Grid>
    </>
  );
}
