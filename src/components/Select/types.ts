
export interface Option {
    value: string;
    label: string;
}

export interface SelectDropdownProps {
    options: Option[];
    defaultValue?: Option;
    onSelect: (option: Option) => void;
}