import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CustomerList from "@/components/CustomerList";

const CustomerSearchWidget = ({ setSelectedCustomer, selectedCustomer }) => {
  const [values, setValues] = useState({
    name: "",
    customerId: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({})
  const [fieldError, setFieldError] = useState(false)
  const [customers, setCustomer] = useState(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleValidation = () => {
    let fields = values;
    let errors = {};
    let formIsValid = true;
    let error = {};

   if(fields.name || fields.customerId || fields.email || fields.phone){

    if (fields["name"]) {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        error["name"] = true;
        formIsValid = false;
        errors["name"] = "Only letters";
      }else{
        error["name"] = false;
      }
    }
    
    if(fields["phone"]){
      if(!fields["phone"].match(/^\d{10}$/)){
        error["phone"] = true;
        formIsValid = false;
        errors["phone"] = "Enter valid phone number";
      }else{
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
      }
      else{
        error["email"] = false;
      }
    }

   }else{
    formIsValid=false;
    errors["isValid"] = "Please fill at least one fields!"
   }
   setFieldError({error:error})
    setErrors({ errors: errors });
    return formIsValid;
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const response = await fetch(
        `/api/customers?customerId=${values.customerId}&name=${values.name}&email=${values.email}&phone=${values.phone}`
      );
      const jsonData = await response.json();
      setCustomer(jsonData);
    } else {
     console.log(errors)
    }
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
          justifyContent={"space-around"}
          spacing={1}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              id="customerId"
              label="Customer Id"
              variant="outlined"
              value={values.customerId}
              onChange={handleInputChange}
              name="customerId"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <TextField
              fullWidth
              id="customerName"
              label="User Name"
              variant="outlined"
              value={values.name}
              onChange={handleInputChange}
              name="name"
              error={fieldError && fieldError.error && fieldError.error.name}
            />
             <Typography variant="inherit" color="error">
              { errors && errors.errors && errors.errors.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={2}>
            <TextField
            fullWidth
              id="customerEmail"
              type="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
              name="email"
              error={fieldError && fieldError.error && fieldError.error.email}
            />
            <Typography variant="inherit" color="error">
              { errors && errors.errors && errors.errors.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <TextField
            fullWidth
              id="customerPhone"
              label="Phone"
              variant="outlined"
              value={values.phone}
              onChange={handleInputChange}
              name="phone"
              error={fieldError && fieldError.error && fieldError.error.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="inherit" color="error">
              { errors && errors.errors && errors.errors.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Button
              className="temp-button"
              sx={{ p: "1rem", minWidth: "10rem", backgroundColor: "#0D497C" }}
              variant="contained"
              onClick={searchHandler}
            >
              Search
            </Button>
            <Typography variant="inherit" color="error">
              { errors && errors.errors && errors.errors.isValid}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {customers && (
        <CustomerList
          customers={customers}
          setSelectedCustomer={setSelectedCustomer}
          selectedCustomer={selectedCustomer}
        />
      )}
    </>
  );
};
export default CustomerSearchWidget;
