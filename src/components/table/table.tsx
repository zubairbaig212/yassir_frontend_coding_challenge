// packages
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

// components
import { DataTableHeader } from './dataTableHeader';
import { Order, DataTableProps } from '../../common/tableProps';
import { DataTableBody } from './dataTableBody';

export const DataTable = ({ data, columns }: DataTableProps) => {
  /**
   * @Hooks
   */
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('customer');

  /**
   *
   * @Methods
   */
  const handleRequestSort = (property: string) => {
    // here we are updating the sort order
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <DataTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={columns}
            />
            <DataTableBody
              data={data}
              columns={columns}
              order={order}
              orderBy={orderBy}
            />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
