interface TableColumn {
  key: string;
  label: string;
  render?: (data: any) => React.ReactNode;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
}
