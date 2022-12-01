// Services
import { helperService } from '../../utils/helperService';
import { axiosApiService } from '../axios/axiosApiService';
import { FilterParams } from './reservationConstantsService';

export const reservationApiService = (() => {
  /**
   * @Variables
   */
  const service = helperService;

  /**
   * @private_methods
   */

  /**
   * @returns Promise
   */

  const getReservations = async (): Promise<any> => {
    const reservations = await axiosApiService.coreApi.get('/reservations');
    return reservations;
  };

  /**
   * @returns Promise
   */
  // makeQueryParams convert the param object into query string
  const getReservationsBySearchFilter = async (
    queryParams: FilterParams
  ): Promise<any> => {
    const reservations = await axiosApiService.coreApi.get(
      // Using the URLSearchParams() constructor to convert an object to a query string
      `/reservations?${service.makeQueryParams(queryParams)}`
    );
    return reservations;
  };

  /**
   * NOTE: Here we are using methods which we need to export from this service.
   */
  return {
    getReservations,
    getReservationsBySearchFilter,
  };
})();
