import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import PrivateRoutes from "@/routes/private-routes";
import PublicRoutes from "@/routes/public-routes";
import { lazy } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

const NotFound = lazy(() => import("@pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicLayout />,
    children: PublicRoutes,
  },
  {
    element: <PrivateLayout />,
    children: PrivateRoutes,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const router = createBrowserRouter(routes);

export { router };
