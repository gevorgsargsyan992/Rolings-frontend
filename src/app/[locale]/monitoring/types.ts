export interface DataCar {
  label: string;
  y: number;
}

export interface DataWeekly {
  x: string;
  y: number;
}

export interface DataMonthly {
  label: string;
  y: number;
}

export interface ChartData {
  name: string;
  "client count": number;
}

export interface IChartArea {
  className?: string;
  data: ChartData[];
  title?: string;
  color?: string;
  tick?: boolean;
}
