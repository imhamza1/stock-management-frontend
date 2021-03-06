import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { toast } from "react-toastify";

import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import TableFooter from "@material-ui/core/TableFooter";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import stockService from "../services/StockService";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { EndOfLineState } from "typescript";
import { SettingsBluetoothOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const useStyles2 = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "8ch",
      height: 40,
    },
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [rowsAfterSearch, setRowsAfterSearch] = useState([]);
  const [searched, setSearched] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [quan, setQuan] = React.useState(null);
  const [quan2, setQuan2] = React.useState(null);
  const [id, setId] = React.useState();
  const [bool, setBool] = React.useState(false);

  const classes = useStyles();
  const classes2 = useStyles2();

  useEffect(() => {
    stockService
      .getStock()
      .then((data) => {
        setRows(data);
        setRowsAfterSearch(data);
        console.log(data);
        console.log(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rowsAfterSearch.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");

    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => {
            requestSearch(searchVal);
          }}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Code</TableCell>

                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Rack No.</TableCell>

                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Stock</TableCell>

                <TableCell align="left">Add to Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.itemCode}
                  </TableCell>

                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.salePrice}</TableCell>
                  <TableCell align="left">{row.rackNumber}</TableCell>

                  <TableCell align="left">
                    <TextField
                      className={classes2.root}
                      id={row._id}
                      variant="outlined"
                      required
                      onChange={(e) => {
                        setId(row._id);
                        setQuan(e.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.stockQuantity}</TableCell>

                  <TableCell align="left">
                    <Button
                      style={{
                        fontSize: 12,
                        backgroundColor: "#3C5186",
                        color: "white",
                      }}
                      onClick={() => {
                        let arr = {
                          id: row._id,
                          itemCode: row.itemCode,
                          name: row.name,
                          disc: 0,
                          discounted: 0,
                          price: row.salePrice,
                          total: row.salePrice * quan,
                          quantity: quan,
                          category: row.category,
                          stock: row.stockQuantity,
                          cost: row.costPrice,
                          date: new Date().getTime() / 1000,
                          totalCost: row.costPrice * quan,
                        };

                        if (quan > row.stockQuantity) {
                          let temp =
                            "Remaining Stock for the Item " +
                            row.name +
                            " is " +
                            row.stockQuantity;
                          toast.error(temp, {
                            position: toast.POSITION.TOP_CENTER,
                          });
                        } else if (quan == null) {
                          toast.warning("Please Enter Quantity", {
                            position: toast.POSITION.TOP_CENTER,
                          });
                        } else {
                          if (localStorage.getItem("receipt") == null) {
                            localStorage.setItem("receipt", "[]");
                          }

                          if (arr.id) {
                            var old_data = JSON.parse(
                              localStorage.getItem("receipt")
                            );
                            var filterArray = old_data.filter(function (item) {
                              console.log(item);
                              console.log(item.id);
                              console.log(arr.id);
                              if (item.id == arr.id) {
                                return item;
                              } else {
                                return null;
                              }
                            });
                            console.log(filterArray);
                            if (filterArray.length == 0) {
                              old_data.push(arr);
                              toast.info("Added to Receipt", {
                                position: toast.POSITION.TOP_CENTER,
                              });
                            } else {
                              toast.warning(
                                "You have already added this item into receipt",
                                {
                                  position: toast.POSITION.TOP_CENTER,
                                }
                              );
                            }

                            localStorage.setItem(
                              "receipt",
                              JSON.stringify(old_data)
                            );
                          }
                        }

                        setQuan(null);
                        setQuan2(null);
                        if (quan != null) {
                          document.getElementById(id).value = "";
                        }
                      }}
                      variant="contained"
                    >
                      Add to Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </>
  );
}
