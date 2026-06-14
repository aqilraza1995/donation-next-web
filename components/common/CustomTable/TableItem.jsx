import { TableBody, TableCell, TableRow } from "@mui/material";

const TableItem = ({ columns, rows, order, orderBy }) => {

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedRows = [...rows].sort(getComparator(order, orderBy))

  return (
    <TableBody>
      {sortedRows?.map((row, index) => (
        <TableRow key={index}>
          {columns?.map((column, colIndex) => (
            <TableCell key={colIndex}>
              {column?.render ? column?.render(row) : row[column.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableItem;