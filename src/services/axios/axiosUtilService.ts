import { axiosConstantsService } from './axiosConstantsService';

/*
 * NOTE: Here we are using api status code with success or error
 */
export const apiUtilService = (() => {
  const isResponseOk = (status: number) =>
    status === axiosConstantsService.STATUS_CODE.SUCCESS;

  const isErrorResponse = (status: number) =>
    status !== axiosConstantsService.STATUS_CODE.INTERNAL_SERVER_ERROR;

  return {
    isResponseOk,
    isErrorResponse,
  };
})();
