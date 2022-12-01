export interface SearchFilterProps {
  handleApply: (value: FilterOption) => void;
}

export interface FilterOption {
  status: string;
  area: string;
  shift?: string;
  date?: Date | string | null;
}
export interface SelectProps {
  handleSelect: (value: string) => void;
  label: string;
  options: string[];
}
