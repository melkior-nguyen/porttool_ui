import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Fonts } from "@/constants/AppEnums";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CheckboxesTags from "./AutocompleteMultiSelect";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { LogsAndAlertsTableHeader } from "./LogsAndAlertsTableHeader";
import { Box, Breadcrumbs, Grid, TableFooter, Typography } from "@mui/material";
import {
  TablePaginationActions,
  columns,
  getComparator,
  rows,
  stableSort,
} from "./LogsAndAlertsUtils";
import { CusMainContent, CusTableCell, CusTypography } from "@/styles/cusMUI";
import { AiFillAlert } from "react-icons/ai";
import AppSearch from "@/components/AppSearch";
import AppDateRange from "@/components/AppDateRange";
import appColors from "@/styles/appColor";

const LogsAndAlerts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <CusMainContent sx={{ backgroundColor: '#fff' }}>
        {/* Title */}
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ backgroundColor: appColors.bg.box, mb: '24px' }}
        >
          <CusTypography ><AiFillAlert />Logs and Alerts</CusTypography>
        </Breadcrumbs>

        {/* Filter & search */}
        <Grid container columnSpacing='12px' sx={{ mb: '24px', px: '24px' }}>
          <Grid item xs={3} md={2} >
            <CheckboxesTags label={'Name'} />
          </Grid>
          <Grid item xs={3} md={2} >
            <CheckboxesTags label={'ISO Code'} />
          </Grid>
          <Grid item xs={3} md={3} sx={{ ml: 'auto' }}>
            <AppSearch />
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer component={Paper} sx={{ px: '24px', height: '100%' }}>
          <Table aria-label="custom pagination table" >
            <LogsAndAlertsTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? stableSort(rows, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : rows
              ).map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = (row as any)[column.id];
                      return (
                        <CusTableCell key={column.id} align={column.align as any}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </CusTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    "& .MuiTablePagination-selectLabel": {
                      fontFamily: 'Nunito',
                      color: appColors.button.primary
                    }
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CusMainContent>
    </>
  );
};

export default LogsAndAlerts;
