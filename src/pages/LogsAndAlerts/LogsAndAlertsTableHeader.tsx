import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { Fonts } from "@/constants/AppEnums";
import { columns } from "./LogsAndAlertsUtils";
import { CusTableCellHead } from "@/styles/cusMUI";

export function LogsAndAlertsTableHeader(props: any) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <CusTableCellHead
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align={'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              minWidth: headCell.minWidth,
              fontWeight: Fonts.BOLD,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </CusTableCellHead>
        ))}
      </TableRow>
    </TableHead>
  );
}

LogsAndAlertsTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};
