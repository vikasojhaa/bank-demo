import { useState } from "react";
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
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CountryList } from "@/utils/countryList";
import MaterialUIPickers from "@/components/DatePicker";

const Customer = () => {
  const [errors, setErrors] = useState({});
  const [fieldError, setFieldError] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerId: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    gender: "",
    nationality: "",
    email_address: "",
    mobile_phone_number: "",
    home_phone_number: "",
    business_phone_number: "",
    country_of_residence: "",
    country_of_taxation: "",
  });

  const [createCustomerRes, setCreateCustomerRes] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };
  const setDOB = (value) => {
    setCustomerData({
      ...customerData,
      ["dob"]: value,
    });
  };
  const cancelHandler = () => {
    location.reload();
  };
  const handleValidation = () => {
    let fields = customerData;
    let errors = {};
    let formIsValid = true;
    let error = {};

    if (fields["name"]) {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        error["name"] = true;
        formIsValid = false;
        errors["name"] = "Only letters";
      } else {
        error["name"] = false;
      }
    }

    if (fields["phone"]) {
      if (!fields["phone"].match(/^\d{10}$/)) {
        error["phone"] = true;
        formIsValid = false;
        errors["phone"] = "Enter valid phone number";
      } else {
        error["phone"] = false;
      }
    }

    if (fields["email"]) {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        error["email"] = true;
        formIsValid = false;
        errors["email"] = "Email is not valid";
      } else {
        error["email"] = false;
      }
    }
    setFieldError({ error: error });
    setErrors({ errors: errors });
    return formIsValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setCreateCustomerRes(false);
    // if (handleValidation()) {
    const response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    });
    const jsonData = await response.json();
    console.log("Customer res::", jsonData);
    setCreateCustomerRes(jsonData);
    // }
  };
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          py: matches ? 1.5 : 0,
          mb: 1,
          textAlign: "left",
          padding: ".4rem",
        }}
      >
        <Grid
          container
          justifyContent={"flex-start"}
          spacing={1}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="customerId"
              label="Customer Id"
              variant="outlined"
              name="customerId"
              value={customerData.customerId}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="first_name"
              type="first_name"
              label="First Name"
              variant="outlined"
              name="first_name"
              value={customerData.first_name}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="middle_name"
              type="middle_name"
              label="Middle Name"
              variant="outlined"
              name="middle_name"
              value={customerData.middle_name}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="last_name"
              type="last_name"
              label="Last Name"
              variant="outlined"
              name="last_name"
              value={customerData.last_name}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <MaterialUIPickers
              device={matches ? "" : "mobile"}
              selectedDate={customerData.dob}
              setSelectedDate={setDOB}
              lable={"Date of Birth"}
              error={fieldError && fieldError.error && fieldError.error.amount}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <FormControl fullWidth>
              <InputLabel
                id="gender"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
              >
                Gender
              </InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={customerData.gender}
                label="Gender"
                name="gender"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
                onChange={handleChange}
              >
                <MenuItem value="CUSTOMER_GENDER_MALE">Male</MenuItem>
                <MenuItem value="CUSTOMER_GENDER_FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.depositUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="nationality"
              label="Nationality"
              variant="outlined"
              name="nationality"
              value={customerData.nationality}
              error={
                fieldError && fieldError.error && fieldError.error.depositPeriod
              }
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.depositPeriod}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
            <FormControl fullWidth>
              <InputLabel
                id="country_of_residence"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
              >
                Country Of Residence
              </InputLabel>
              <Select
                labelId="country_of_residence"
                id="country_of_residence"
                value={customerData.country_of_residence}
                label="Country Of Residence"
                name="country_of_residence"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
                onChange={handleChange}
              >
                {CountryList.map((element) => {
                  return (
                    <MenuItem key={element.code} value={element.name}>
                      {element.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.depositUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <FormControl fullWidth>
              <InputLabel
                id="country_of_taxation"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
              >
                Country Of Taxation
              </InputLabel>
              <Select
                labelId="country_of_taxation"
                id="country_of_taxation"
                value={customerData.country_of_taxation}
                label="Country Of Taxation"
                name="country_of_taxation"
                error={
                  fieldError && fieldError.error && fieldError.error.depositUnit
                }
                onChange={handleChange}
              >
                {CountryList.map((element) => {
                  return (
                    <MenuItem key={element.code} value={element.name}>
                      {element.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.depositUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="email_address"
              type="email"
              label="Email"
              variant="outlined"
              name="email_address"
              value={customerData.email_address}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="mobile_phone_number"
              label="Mobile No"
              variant="outlined"
              name="mobile_phone_number"
              value={customerData.mobile_phone_number}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="home_phone_number"
              label="Home Mobile No"
              variant="outlined"
              name="home_phone_number"
              value={customerData.home_phone_number}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="business_phone_number"
              label="Business Mobile No"
              variant="outlined"
              name="business_phone_number"
              value={customerData.business_phone_number}
              error={fieldError && fieldError.error && fieldError.error.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors && errors.errors && errors.errors.amount}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-around"}
          spacing={1}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
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
        {createCustomerRes && (
          <Grid
            container
            justifyContent={"space-around"}
            spacing={1}
            sx={{ my: 2 }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                sx={{
                  color: createCustomerRes.id ? "#61a95c" : "#e13925",
                  textAlign: "center",
                }}
                variant="h6"
                gutterBottom
              >
                {createCustomerRes.id
                  ? `Customer created succesfuly, Customer Id: ${createCustomerRes.id}.`
                  : `Error: ${createCustomerRes.message}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};
export default Customer;
