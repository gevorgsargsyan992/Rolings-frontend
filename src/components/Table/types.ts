import { ReactNode } from "react";

interface TableColumn {
  key: string;
  label: string;
  render?: (data: any) => ReactNode;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
}
