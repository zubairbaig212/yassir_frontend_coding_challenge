// Packages
import axios, { AxiosInstance } from 'axios';

// Services
import { axiosConstantsService } from './axiosConstantsService';
import config from '../../config.json';

/*
 * NOTE: This service is using revealing module design pattern.
 */
export const baseUrl = config.baseURL;

// eslint-disable-next-line func-names
export const axiosApiService = (() => {
  const getServicePayload = (axiosInstance: AxiosInstance) => ({
    get: async (url: string, options = {}) => {
      const result = await axiosInstance.get(url, { ...options });
      return result;
    },
  });

  const apiCoreServiceInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /*
   * If we need to store token for authorization so we would use the following code
   */
  /* Request interceptors config */
  const apiCoreServiceRequestInterceptor = (axiosConfig: any) => {
    // const userSession = JSON.parse(localStorage.getItem("user") ?? "{}");
    // if (userSession.token) {
    //   axiosConfig.headers.common.Authorization = userSession.token;
    // }
    return axiosConfig;
  };
  const apiCoreServiceRequestErrorInterceptor = async (error: any) => {
    const result = await Promise.reject(error);
    return result;
  };

  apiCoreServiceInstance.interceptors.request.use(
    apiCoreServiceRequestInterceptor,
    apiCoreServiceRequestErrorInterceptor
  );

  // Response interceptors config
  const apiCoreServiceResponseInterceptor = (response: { data: any }) =>
    response.data;
  const apiCoreServiceResponseErrorInterceptor = async (error: any) => {
    if (
      error?.response &&
      error.response.status === axiosConstantsService.STATUS_CODE.TOKEN_EXPIRED
    ) {
      // We can determine refresh token logic over to fetch the new token and set it in headers
    } else if (
      error?.response &&
      error.response.status === axiosConstantsService.STATUS_CODE.UNAUTHORIZED
    ) {
      // If we need to include any logic when user is unauthorized will be handled in this block
      // localStorage.removeItem("user");
      /* If we want to redirect user to login or any unauthentic route so we would use following line */
      // window.location.replace(routeConstantsService.unAuthenticatedRoutes.login.path);
    }
    // Error message show from here
    // Alert or we can use any other Toast service
    // <Alert severity="error">error?.response?.statusText</Alert>
    const result = await Promise.reject(error?.response?.statusText);
    return result;
  };

  apiCoreServiceInstance.interceptors.response.use(
    apiCoreServiceResponseInterceptor,
    apiCoreServiceResponseErrorInterceptor
  );

  return {
    coreApi: getServicePayload(apiCoreServiceInstance),
  };
})();
