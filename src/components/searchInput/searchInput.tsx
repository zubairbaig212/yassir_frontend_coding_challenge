import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder: string;
  label: string;
  onFilterChange: (type: string) => void;
}

export const SearchInput = ({
  placeholder,
  label,
  onFilterChange,
}: SearchInputProps) => {
  /**
   * @Hooks
   */
  const [searchText, setSearchText] = useState<string>('');
  const debouncedState = useDebounce(searchText, 500);

  /**
   *
   * @Methods
   */

  const handleFilter = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    onFilterChange?.(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedState, onFilterChange]);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        placeholder={placeholder}
        onChange={({ target: { value } }) => handleFilter(value)}
      />
    </Box>
  );
};
