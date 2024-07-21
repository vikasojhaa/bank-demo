import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CustomerList = ({ customers, setSelectedCustomer, selectedCustomer }) => {
  let options = [];
  if (customers?.customers?.length > 0) options = customers.customers;
  else if (customers?.id) options = [customers];

  console.log(options);
  if (!options.length)
    return (
      <Typography
        sx={{
          color: "#e13925",
          textAlign: "center",
        }}
        variant="h6"
        gutterBottom
      >
        Error: No Customer Found !!
      </Typography>
    );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:hover": { cursor: "pointer" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
              hover={true}
              selected={selectedCustomer?.id === row.id}
              onClick={() => setSelectedCustomer && setSelectedCustomer(row)}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell component="th" scope="row">
                {row.customer_details.first_name +
                  " " +
                  row.customer_details.middle_name +
                  " " +
                  row.customer_details.last_name}
              </TableCell>
              <TableCell>{row.customer_details.email_address}</TableCell>
              <TableCell>{row.customer_details.mobile_phone_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomerList.propTypes = {
  setSelectedCustomer: PropTypes.func,
  customers: PropTypes.object.isRequired,
};
export default CustomerList;
