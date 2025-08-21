import { isEqual } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const { isLogin } = useSelector((state) => state.user, isEqual);
  if (isLogin) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex flex-row items-center justify-between p-5 bg-background">
        <p className="">Header</p>
      </div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
