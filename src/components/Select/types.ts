export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  defaultValue?: Option;
  onSelect?: (option: Option) => void;
}
