import { ReactNode } from "react";

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  url?: string;
  isRowClickable?: boolean;
  rowActions?: TableAction<T>[];
}

interface Column<T> {
  key: keyof T;
  label: string;
  editable?: boolean;
  render?: (value: T[keyof T]) => ReactNode;
  link?: boolean;
}

interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
}
