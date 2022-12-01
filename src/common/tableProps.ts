export interface HeaderCell {
  id: string;
  label: string;
}

export type Order = 'asc' | 'desc';

export interface DataTableProps {
  columns: readonly HeaderCell[];
  data: Array<any>;
}

export interface DataTableBodyProps {
  columns: readonly HeaderCell[];
  data: Array<any>;
  order: Order;
  orderBy: string;
}

export interface DataTableHeaderProps {
  onRequestSort: (property: string) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeaderCell[];
}
