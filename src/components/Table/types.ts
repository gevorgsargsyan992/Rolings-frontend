import React, { ReactNode } from "react";

// interface TableColumn {
//   key: string;
//   label: string;
//   render?: (data: any) => ReactNode;
// }
//
// export interface TableProps {
//   data: any[];
//   columns: TableColumn[];
//   className?: string;
//   isRowEdit?: boolean;
//   isRowClickable?: boolean;
// }

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  isRowEdit?: boolean;
  url?: string;
  isRowClickable?: boolean;
  rowActions?: TableAction<T>[]; // New prop for row actions
}

interface Column<T> {
  key: keyof T;
  label: string;
  editable?: boolean;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
}

