import * as React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Img, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrustSafe from "../utils/trustSafe.svg";
import Image from "next/image";
import { Paper } from "@mui/material";

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container p={2}>
      <Grid item xs={12} md={12} lg={6}>
        <Image src={TrustSafe} alt="Follow us on Twitter" />
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <Grid container direction="column" spacing={1} sx={{ p: 5, pt: 3 }}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Email Address"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#0D497C" }}
              onClick={() => router.push("/dashboard")}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12} textAlign="center">
            <Link>Forgot Password?</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
