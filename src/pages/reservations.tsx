// Packages
import { useEffect, useState } from 'react';
import moment from 'moment';

// Services
import { dateTimeFormatService } from '../utils/dateTimeFormat';
import { reservationApiService } from '../services/reservations/reservationApiService';
import {
  FilterParams,
  ReservationProps,
} from '../services/reservations/reservationConstantsService';

// Constants
import { CONSTANTS } from '../constants/constants';

// Components
import { FilterListIcon } from '../components/svgIcons/filterListIcon';
import { SearchInput } from '../components/searchInput/searchInput';
import { FilterOption } from '../common/searchFilterProps';
import { DataTable } from '../components/table/table';
import { HeaderCell } from '../common/tableProps';
import { SearchFilter } from '../components/searchFilter/searchFilter';

export default function Reservations() {
  /**
   * @Hooks
   */
  /* useState is a Hook that lets you add React state to function components
   */

  /* Reservation list */
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  /* Search Input to fetch customer's name */
  const [searchInputValue, setSearchedValue] = useState<string>('');

  /* Columns */
  const columns: readonly HeaderCell[] = [
    {
      id: 'customer',
      label: 'Customer',
    },
    {
      id: 'area',
      label: 'Area',
    },
    {
      id: 'quantity',
      label: 'Quantity',
    },
    {
      id: 'shift',
      label: 'Shift',
    },
    {
      id: 'businessDate',
      label: 'Reservation Date',
    },
    {
      id: 'start',
      label: 'Reservation From',
    },
    {
      id: 'end',
      label: 'Reservation To',
    },
    {
      id: 'guestNotes',
      label: 'Notes',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ];

  /**
   *
   * @Methods
   */

  /* Fetch All Reservations from JSON server */
  const getReservations = async () => {
    try {
      const response = await reservationApiService.getReservations();
      const upcomingReservations = response.filter(
        (res: ReservationProps) =>
          moment(res.businessDate, CONSTANTS.date_time.ddmmyyy).diff(
            moment(),
            'd'
          ) > 0
      );
      setReservations(upcomingReservations);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  Sometimes, we want to run some additional code after React has updated the DOM.
  By using this Hook, you tell React that your component needs to do something after render.
  */
  useEffect(() => {
    getReservations();
  }, []);

  /*
    Here we are mapping the list and returning object for reservation list
  */
  const mappingReservationList = (filteredReservations: ReservationProps[]) => {
    return filteredReservations.map((reservation) => {
      const key: any = { ...reservation };
      if (reservation.customer) {
        key.customer = `${reservation.customer.firstName} ${reservation.customer.lastName}`;
      }
      key.end = dateTimeFormatService.formatDateTime(
        reservation.end,
        CONSTANTS.date_time.hmma
      );
      key.start = dateTimeFormatService.formatDateTime(
        reservation.start,
        CONSTANTS.date_time.hmma
      );
      return key;
    });
  };

  /*
    Search filter for fetching filtered reservation list
  */
  const searchedData = () => {
    const filtered = reservations?.filter(
      (reservation: ReservationProps) =>
        (reservation.customer &&
          reservation.customer.firstName
            .toString()
            .toLowerCase()
            .includes(searchInputValue.toString().toLowerCase())) ||
        (reservation.customer &&
          reservation.customer?.lastName
            ?.toString()
            .toLowerCase()
            .includes(searchInputValue.toString().toLowerCase()))
    );
    return filtered && filtered.length > 0
      ? mappingReservationList(filtered)
      : [];
  };

  /*
    fetching reservation list by selected filters
  */
  const getReservationsBySearchFilter = async (filterParams: FilterParams) => {
    try {
      const response =
        await reservationApiService.getReservationsBySearchFilter(filterParams);
      setReservations(response);
    } catch (error) {
      console.log(error);
    }
  };

  /*
      We are using custom hook useDebounce to prevent from multiple server requests
      Execute when user type any value in search input
   */
  const handleSearchInput = (inputValue: string) => {
    setSearchedValue(inputValue);
    searchedData();
  };

  /*
  Filters are receiving in handleFilter event i.e
   value coming from SearchInput Component 
  */
  const handleFilter = (value: FilterOption) => {
    const { status, shift, area, date } = value;
    const queryParams = {
      status,
      shift,
      area,
      businessDate: dateTimeFormatService.formatDateTime(
        date,
        CONSTANTS.date_time.ddmmyyy
      ),
    };
    getReservationsBySearchFilter(queryParams);
  };

  return (
    <div>
      {/*  Search Input and Search Filter Dropdown  */}
      <div className="flex-between">
        <div className="d-flex">
          {/* Input Search by name and surname */}
          <SearchInput
            label="Search"
            placeholder="Search By Name & Surname"
            onFilterChange={handleSearchInput}
          />

          {/* Search Filter Dropdown for shift, area, status */}
          <SearchFilter handleApply={handleFilter} />
        </div>

        <div className="filter-icon">
          {/* Filter Icon */}
          FILTERS <FilterListIcon />
        </div>
      </div>

      {/* DataTable to show Reservation List */}
      <DataTable data={searchedData()} columns={columns} />
    </div>
  );
}
