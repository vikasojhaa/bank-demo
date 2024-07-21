import { useState } from "react";
import { Grid, TextField, InputAdornment, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchDialog from "@/components/SearchDialog";

const CustomerDetails = ({ handleSelectedCustomer }) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customerId = selectedCustomer?.id || "";
  const email_address = selectedCustomer?.customer_details?.email_address || "";
  const mobile_phone_number =
    selectedCustomer?.customer_details?.mobile_phone_number || "";
  const first_name = selectedCustomer?.customer_details?.first_name || "";
  const middle_name = selectedCustomer?.customer_details?.middle_name || "";
  const last_name = selectedCustomer?.customer_details?.last_name || "";
  const name = first_name ? `${first_name} ${middle_name} ${last_name}` : "";

  const handleClose = (value) => {
    setOpen(false);
    setSelectedCustomer(value);
    handleSelectedCustomer && handleSelectedCustomer(value);
  };
  return (
    <>
      <SearchDialog onClose={handleClose} open={open} />
      <Grid container spacing={2} justifyContent={"space-around"} sx={{ my: 2 }}>
        <Grid item xs={12} md={12} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="customerId"
            value={customerId}
            label="Customer Id"
            onClick={() => {
              setOpen(true);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            // sx={{ width: "17.4rem" }}
          />
           </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="customerName"
            label="Name"
            value={name}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            // sx={{ width: "17.4rem" }}
          />
           </FormControl>
        </Grid>

        <Grid item xs={12} md={12} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="customerEmail"
            type="email"
            label="Email"
            value={email_address}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
           </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="customerPhone"
            label="Phone"
            value={mobile_phone_number}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            // sx={{ width: "17.4rem" }}
          />
           </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerDetails;
