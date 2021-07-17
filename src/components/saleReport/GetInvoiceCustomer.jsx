import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { toast } from "react-toastify";
import PrintIcon from "@material-ui/icons/Print";
import StorageIcon from "@material-ui/icons/Storage";
import invoiceService from "../services/InvoiceService";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  hide: {
    "&:print": {
      display: "none",
    },
  },
});

function total(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}
function printReceipt() {
  window.print();
}

// function getDate() {
//   var dateObj = new Date();
//   var month = dateObj.getUTCMonth() + 1; //months from 1-12
//   var day = dateObj.getDate();
//   var year = dateObj.getUTCFullYear();

//   return day + "/" + month + "/" + year;
// }
const GetInvoiceCustomer = (props) => {
  const [receipt, setReceipt] = React.useState([]);
  const [cname, setCname] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [discount, setDiscount] = React.useState("0");
  const [_date, setDate] = React.useState();
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [paid, setPaid] = React.useState(0);
  const [remaining, setRemaining] = React.useState(0);
  const [salePriceTotal, setSalePriceTotal] = React.useState(0);
  const classes = useStyles();
  const id = props.match.params.id;

  useEffect(() => {
    console.log(id);
    invoiceService
      .getSingleCustomer(id)
      .then((data) => {
        console.log(data);
        setRows(data.data);
        setDate(data.date);
        setAddress(data.address);
        setContact(data.contact);
        setCname(data.customerName);
        setPaid(data.paid);
        setRemaining(data.remaining);
        setSalePriceTotal(data.salePriceTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <div
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          color: "green",
        }}
      >
        <span>MADINA TRADERS</span>
      </div>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <span>Mobile #: 0321-8464465, 03004001431</span>
      </div>
      <br />
      <div style={{ fontWeight: "bold", marginLeft: 10 }}>
        <span>date: {new Date(_date * 1000).toDateString()}</span>
      </div>
      <br />
      <Grid container>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Customer Name : {cname}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Address : {address}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Contact : {contact}</span>
          </div>
        </Grid>
      </Grid>

      <br />
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell align="right">Desc</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Disc %</TableCell>
            <TableCell align="right">Disc</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {rows.map((row) => (
              <TableRow key={row.itemCode}>
                <TableCell id="no-print">{row.itemCode}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.disc}</TableCell>
                <TableCell align="right">{row.discounted}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell align="right">{salePriceTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Paid</TableCell>
              <TableCell align="right">{paid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Remaining</TableCell>
              <TableCell align="right">{remaining}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Receive Payment</TableCell>
              <TableCell align="right">
                <EditText
                  id="customer"
                  style={{ width: 100 }}
                  placeholder="Enter Amount"
                  onSave={({ value }) => {
                    localStorage.setItem("amount_receieved", value);
                  }}
                  defaultValue={
                    localStorage.getItem("amount_receieved")
                      ? JSON.parse(localStorage.getItem("amount_receieved"))
                      : 0
                  }
                />
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
      <div style={{ textAlign: "center" }}>
        <Button
          startIcon={<PrintIcon />}
          style={{ margin: 10 }}
          variant="contained"
          id="no-print"
          color="primary"
          onClick={printReceipt}
        >
          Print
        </Button>
        <Button
          startIcon={<StorageIcon />}
          style={{ margin: 10, backgroundColor: "purple", color: "white" }}
          variant="contained"
          id="no-print"
          onClick={() => {
            console.log(localStorage.getItem("amount_receieved"));
            invoiceService
              .updateSingleCustomer(
                id,
                JSON.parse(localStorage.getItem("amount_receieved"))
              )
              .then((data) => {
                console.log(data);
                toast.success("Done!", {
                  position: toast.POSITION.TOP_CENTER,
                });
                JSON.stringify(localStorage.setItem("amount_receieved", 0));
                window.location.reload();
              })
              .catch((err) => console.log(err));
          }}
        >
          Add To Record
        </Button>
      </div>
    </TableContainer>
  );
};

export default withRouter(GetInvoiceCustomer);
