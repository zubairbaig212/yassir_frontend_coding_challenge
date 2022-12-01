import moment from 'moment';

export const dateTimeFormatService = (() => {
  /**
   * @private_methods
   */

  /**
   * @returns Moment
   */

  /*
   * NOTE: Here we are converting date into moment and update its date type.
   */
  const formatDateTime = (
    date: string | Date | null | undefined,
    type: string
  ) => {
    if (!date) return '';
    return moment(date).utc(true).format(type);
  };

  /**
   * NOTE: Here we are using methods which we need to export from this service.
   */
  return {
    formatDateTime,
  };
})();
