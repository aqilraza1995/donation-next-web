import { TableBody, TableCell, TableRow } from "@mui/material";

const TableItem = ({ columns, rows, order, orderBy }) => {

  const descendingComparator = (a, b, orderBy) => {
    const column = columns.find(col => col.id === orderBy);

    const aValue = column?.sortValue
      ? column.sortValue(a)
      : a[orderBy];

    const bValue = column?.sortValue
      ? column.sortValue(b)
      : b[orderBy];

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedRows = [...rows].sort(getComparator(order, orderBy))

  return (
    <TableBody>
      {sortedRows?.length ? sortedRows?.map((row, index) => (
        <TableRow key={index}>
          {columns?.map((column, colIndex) => (
            <TableCell key={colIndex} align={column?.align || "left"}>
              {column?.render ? column?.render(row) : row[column.id]}
            </TableCell>
          ))}
        </TableRow>
      )) :
        <TableRow>
          <TableCell colSpan={columns?.length} align="center">No Record Found</TableCell>
        </TableRow>
      }
    </TableBody>
  )
}

export default TableItem;