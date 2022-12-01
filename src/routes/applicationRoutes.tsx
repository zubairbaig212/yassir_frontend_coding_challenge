// Packages
import { ElementType, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

// Types
import { ApplicationRouterProps } from '../services/routes/routeTypes';

// Services
import { routeUtilService } from '../services/routes/routeUtilService';

const AppRoutes = () => {
  /**
   *
   * @Methods
   */
  const renderRoutes = (routes: ApplicationRouterProps[]) => {
    if (!routes?.length) return true;
    return routes.map((route: ApplicationRouterProps) => {
      const Component = route.component as ElementType;
      return (
        <Route
          key={route.key}
          index={route.index}
          {...(!route.index ? { path: route.path } : {})}
          element={<Component />}
        >
          {renderRoutes(route.childrenRoutes as ApplicationRouterProps[])}
        </Route>
      );
      /*
       * NOTE: We don't have any protected route for now, but if we want to add any protected route
      so we can make if else condition and update route accordingly.
       */
      // Protected Routes would show here if in case we have any route
    });
  };

  /**
   * @Variables
   */
  const applicationRoutes = useMemo(() => {
    return <Routes>{renderRoutes(routeUtilService.applicationRoutes)}</Routes>;
  }, []);

  /**
   * @Render
   */

  return <div>{applicationRoutes}</div>;
};

export default AppRoutes;
