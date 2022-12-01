// Packages
import { ElementType } from 'react';

export interface ApplicationRouterProps {
  key: string;
  title: string;
  path: string;
  isProtected?: boolean;
  component?: ElementType;
  childrenRoutes?: ApplicationRouterProps[];
  index?: boolean;
}
