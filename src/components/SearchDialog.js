import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import CustomerSearchWidget from "@/components/CustomerSearchWidget";

const SearchDialog = (props) => {
  const { onClose, value: valueProp, open } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog sx={{ maxWidth: "200rem" }} maxWidth="lg" open={open}>
      <DialogTitle>Select the Customer</DialogTitle>
      <DialogContent dividers>
        <CustomerSearchWidget
          selectedCustomer={value}
          setSelectedCustomer={setValue}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string,
};
export default SearchDialog;
