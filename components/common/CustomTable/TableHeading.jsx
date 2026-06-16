import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeading = ({ columns, orderBy, order, onRequestSort }) => {

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow sx={{ backgroundColor: '#FF8e29' }}>
        {columns?.map((column, index) => (
          <TableCell key={index} sx={{ fontWeight: '800' }} align={column?.align || "left"}>
            {!column?.stopSort ? (
              <TableSortLabel
                active={orderBy === column?.id}
                direction={orderBy === column?.id ? order : 'asc'}
                onClick={createSortHandler(column?.id)}
              >
                {column?.label}
              </TableSortLabel>) : column?.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeading;