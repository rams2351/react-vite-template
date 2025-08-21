import { isEqual } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  const { isLogin } = useSelector((state) => state.user, isEqual);

  if (!isLogin) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <div className="min-h-screen w-full flex flex-col">
      helllo private layout
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
