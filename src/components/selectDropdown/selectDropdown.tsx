// packages
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// services
import { helperService } from '../../utils/helperService';
import { SelectProps } from '../../common/searchFilterProps';

/**
 * @Variables
 */
const service = helperService;

export const SelectDropdown = ({
  handleSelect,
  label,
  options,
}: SelectProps) => {
  /**
   * @Hooks
   */
  const [value, setValue] = useState('');

  /**
   *
   * @Methods
   */
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    handleSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* Dynamic dropdown used for search filter  */}
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {options.map((statusValue: string) => (
            <MenuItem value={statusValue} key={statusValue}>
              {/* Make first letter capital  */}
              {service.capitalizeFirstLowercaseRest(statusValue)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
