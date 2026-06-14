import { Box, Paper, Table, TableContainer } from "@mui/material";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";

const CustomTable = ({ columns, rows, orderBy, order, onRequestSort }) => {

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
      </Paper>
    </Box>
  )
}

export default CustomTable;