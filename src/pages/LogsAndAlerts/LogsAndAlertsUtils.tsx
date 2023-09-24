import PropTypes from "prop-types";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

export function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, mx: 5 }}>
      <IconButton
        sx={{ height: 36, width: 36 }}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <BsChevronBarRight />
        ) : (
          <BsChevronBarLeft />
        )}
      </IconButton>
      <IconButton
        sx={{ height: 36, width: 36 }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <BsChevronRight /> : <BsChevronLeft />}
      </IconButton>
      <IconButton
        sx={{ height: 36, width: 36 }}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <BsChevronLeft /> : <BsChevronRight />}
      </IconButton>
      <IconButton
        sx={{ height: 36, width: 36 }}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <BsChevronBarLeft />
        ) : (
          <BsChevronBarRight />
        )}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const columns = [
  {
    id: "name",
    numeric: false,
    label: "Name",
    minWidth: 170,
  },
  {
    id: "code",
    label: "ISO\u00a0Code",
    minWidth: 100,
  },
  {
    id: "population",
    numeric: true,
    label: "Population",
    minWidth: 170,
    align: "left",
    format: (value: any) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    numeric: true,
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "left",
    format: (value: any) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    numeric: true,
    label: "Density",
    minWidth: 170,
    align: "left",
    format: (value: any) => value.toFixed(2),
  },
];

export function createData(name: any, code: any, population: any, size: any) {
  const density = population / size;
  return { name, code, population, size, density };
}

export function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: any, orderBy: any) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: any, comparator: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

export const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];
