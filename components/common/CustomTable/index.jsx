import { Box, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";

const CustomTable = ({
  columns,
  rows,
  orderBy,
  order,
  onRequestSort,
  page = 1,
  rowsPerPage = 10,
  handleChangePage,
  handleChangeRowsPerPage,
  count
}) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 5 }}>
        <TableContainer sx={{ borderRadius: 5 }}>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <TableHeading
              columns={columns}
              orderBy={orderBy}
              order={order}
              onRequestSort={onRequestSort}
            />
            <TableItem
              columns={columns}
              rows={rows}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            />
          </Table>
        </TableContainer>
        {count > 0 &&
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
    </Box>
  )
}

export default CustomTable;