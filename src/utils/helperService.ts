export const helperService = (() => {
  /* Make first letter capital  */
  const capitalizeFirstLowercaseRest = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const makeQueryParams = (param: any) => {
    /*
     *  Here we deleting param key which doesn't have value because json-server api not reading empty filter.
     */
    for (const [key, value] of Object.entries(param)) {
      if (!value) delete param[key];
    }
    return new URLSearchParams(param).toString();
  };

  const useStatusColor = (status: any) => {
    // here we update status chip color
    let color: string;
    switch (status) {
      case 'CONFIRMED':
        color = 'bg-success';
        break;
      case 'SEATED':
        color = 'bg-warning';
        break;
      case 'CHECKED OUT':
        color = 'bg-secondary';
        break;
      case 'NOT CONFIRMED':
        color = 'bg-info';
        break;
      default:
        color = 'bg-disabled';
    }
    return color;
  };

  /*
   * NOTE: Here we are using methods which we need to export from this service.
   */
  return {
    capitalizeFirstLowercaseRest,
    makeQueryParams,
    useStatusColor,
  };
})();
