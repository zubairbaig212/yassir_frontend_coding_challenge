// Components
import Reservations from '../../pages/reservations';

// Services
import { routeConstantsService } from './routeConstantsService';

// Types
import { ApplicationRouterProps } from './routeTypes';

export const routeUtilService = (() => {
  /**
   * NOTE: Unauthenticated routes will be updated down.
   */
  const unAuthenticatedRoutes: ApplicationRouterProps[] = [
    {
      ...routeConstantsService.unAuthenticatedRoutes.reservation,
      component: Reservations,
    },
  ];

  /**
   * NOTE: Since we don't have any authenticated route, but incase if there would any authenticated router exist
   * ,then it would be show down here.
   */
  // const authenticatedRoutes: ApplicationRouterProps[] = [];

  // Here we are merging route Array for all routes.
  const applicationRoutes: ApplicationRouterProps[] = [
    ...unAuthenticatedRoutes,
    // ...authenticatedRoutes,
  ];

  /**
   * @Public_Methods
   */
  return {
    applicationRoutes,
  };
})();
