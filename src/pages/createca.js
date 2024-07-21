import Head from "next/head";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider, Typography } from "@mui/material";
import CACreation from "@/components/CACreation";

const CreateCA = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Head>
        <title>Create Current Account</title>
        <meta name="description" content="Create Current Account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        sx={{ px: matches ? 2 : 0 }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{
              color: "primary",
              textAlign: matches ? undefined : "center",
            }}
            variant="h5"
            gutterBottom
          >
            Create Current Account
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{ borderColor: "#BCBDC0", marginBottom: "10px" }}
            pl={5}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <CACreation />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateCA;
