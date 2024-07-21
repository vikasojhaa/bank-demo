import Head from "next/head";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import LoginPage from "@/components/LoginPage";

export default function Home() {
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
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        style={{ minHeight: "75vh", overflow: "hidden" }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <LoginPage />
        </Grid>
      </Grid>
    </>
  );
}
