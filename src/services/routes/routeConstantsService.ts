// Types
import { ApplicationRouterProps } from './routeTypes';

export const routeConstantsService = (() => {
  /**
   * NOTE: Declare all routes which doesn't require authentication over here.
   */
  const unAuthenticatedRoutes: Record<string, ApplicationRouterProps> = {
    /**
     * NOTE: Only for this time because we don't need any authenticated user to access this page, but in future
     * if we want to restrict this page so we will update this router to below method const authenticationRoutes
     * which is currently commented.
     */
    reservation: {
      key: 'reservation',
      title: 'Reservation',
      path: '/',
    },
  };

  /**
   * NOTE: Declare all authenticated routes which require user authentication.
   */
  // const authenticatedRoutes: Record<string, ApplicationRouterProps> = {};

  /**
   * @Public_Methods
   */
  return {
    // authenticatedRoutes,
    unAuthenticatedRoutes,
  };
})();
