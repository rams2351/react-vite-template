import React from "react";
import { type RouteObject } from "react-router-dom";

const PrivateRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    Component: React.lazy(() => import("@/pages/private/Dashboard")),
  },
  {
    path: "/profile",
    Component: React.lazy(() => import("@/pages/private/Profile")),
  },
];

export default PrivateRoutes;
