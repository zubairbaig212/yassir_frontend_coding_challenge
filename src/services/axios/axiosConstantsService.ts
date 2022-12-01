export const axiosConstantsService = (() => {
  /**
   * NOTE: Here are some useful codes which we need to display according to api result.
   */
  const STATUS_CODE = {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    TOKEN_EXPIRED: 403,
    BAD_REQUEST: 400,
  };

  return {
    STATUS_CODE,
  };
})();
