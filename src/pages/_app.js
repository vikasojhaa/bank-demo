import "@/styles/globals.css";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import ThemeProvider from "../theme";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={2}></Grid>
          <Grid item xs={12} md={12} lg={10}>
            <Component {...pageProps} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
