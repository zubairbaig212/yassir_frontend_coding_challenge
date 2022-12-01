// spaced-comment: add space or tab after // in below imports

// Packages
import { useState } from 'react';

// components
import { CONSTANTS } from '../../constants/constants';
import { SelectDropdown } from '../selectDropdown/selectDropdown';
import { dateTimeFormatService } from '../../utils/dateTimeFormat';
import {
  FilterOption,
  SearchFilterProps,
} from '../../common/searchFilterProps';

export const SearchFilter = ({ handleApply }: SearchFilterProps) => {
  /**
   * @Hooks
   */
  const [date, setDate] = useState<Date | string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [shift, setShift] = useState<string>('');
  const [area, setArea] = useState<string>('');

  // using property shorthand
  const param: FilterOption = {
    status,
    area,
    shift,
    date,
  };

  /**
   *
   * @Methods
   */
  const handleChange = (type: string, value: string) => {
    switch (type) {
      // get status
      case 'status':
        setStatus(value);
        param.status = value;
        break;
      // get shift
      case 'shift':
        setShift(value);
        param.shift = value;
        break;
      // get area
      case 'area':
        setArea(value);
        param.area = value;
        break;
      // get business date
      case 'date':
        setDate(value);
        param.date = value;
        break;
      default:
      // code block
    }
    handleApply(param);
  };

  return (
    <div className="form-group d-flex">
      {/* Status */}
      <SelectDropdown
        handleSelect={(e) => handleChange('status', e)}
        options={CONSTANTS.status}
        label="Status"
      />

      {/* Reservation Shifts */}
      <SelectDropdown
        handleSelect={(e) => handleChange('shift', e)}
        options={CONSTANTS.shifts}
        label="Shift"
      />

      {/* Reservation Area */}
      <SelectDropdown
        handleSelect={(e) => handleChange('area', e)}
        options={CONSTANTS.area}
        label="Area"
      />

      {/* Reservation Date */}
      <div>
        <input
          type="date"
          id="date"
          name="date"
          className="date-filter"
          placeholder="Select Reservation Date"
          onChange={(dateEvent) => handleChange('date', dateEvent.target.value)}
          min={dateTimeFormatService.formatDateTime(
            new Date(),
            CONSTANTS.date_time.ddmmyyy
          )}
        />
      </div>
    </div>
  );
};
