import React from "react";
import type { RouteObject } from "react-router-dom";

const PublicRoutes: RouteObject[] = [
  {
    path: "/login",
    Component: React.lazy(() => import("@/pages/public/Login")),
  },
  {
    path: "/register",
    Component: React.lazy(() => import("@/pages/public/Register")),
  },
];

export default PublicRoutes;
