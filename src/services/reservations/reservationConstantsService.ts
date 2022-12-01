export interface Customer {
  firstName: string;
  lastName?: string;
}
export interface ReservationProps {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: Customer;
  area: string;
  guestNotes: string;
}

export interface FilterParams {
  status?: string;
  shift?: string;
  area?: string;
  businessDate?: string;
}

/*
Reservation Constant Service
If we need any constants or enum so we would listed down here
*/
export const reservationConstantsService = (() => {
  return {};
})();
