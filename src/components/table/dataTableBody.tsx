// packages
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

// Services
import { Order, DataTableBodyProps } from '../../common/tableProps';
import { ReservationProps } from '../../services/reservations/reservationConstantsService';
import { helperService } from '../../utils/helperService';

/**
 * @Variables
 */
const service = helperService;

export const DataTableBody = ({
  data,
  columns,
  order,
  orderBy,
}: DataTableBodyProps) => {
  // here we are updating the sort order

  /**
   *
   * @Methods
   */

  function descendingComparator<T>(a: T, b: T, orderName: keyof T) {
    if (b[orderName] < a[orderName]) {
      return -1;
    }
    if (b[orderName] > a[orderName]) {
      return 1;
    }
    return 0;
  }

  const getComparator = <Key extends keyof any>(
    orderKey: Order,
    orderName: Key
  ): ((
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number) => {
    return orderKey === 'desc'
      ? (a, b) => descendingComparator(a, b, orderName)
      : (a, b) => -descendingComparator(a, b, orderName);
  };

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function tableSort<T>(
    array: ReservationProps[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const orderSort = comparator(a[0], b[0]);
      if (orderSort !== 0) {
        return orderSort;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <TableBody>
      {/* if you don't need to support IE11, you can replace the `tableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
      {tableSort(data, getComparator(order, orderBy)).map((row) => {
        return (
          <TableRow hover>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell
                  key={column.id}
                  className={
                    column.id === 'status' ? service.useStatusColor(value) : ''
                  }
                >
                  {typeof value === 'string'
                    ? service.capitalizeFirstLowercaseRest(value)
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {/* No records are showing  */}
      {data.length === 0 && (
        <TableRow>
          <TableCell colSpan={12} style={{ textAlign: 'center' }}>
            No Record found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
