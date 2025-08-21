import Button from "@/components/common/Button";
import { actions } from "@/redux/slices/reducer";
import React from "react";
import { useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actions.doLogout());
  };

  return (
    <div>
      <h1 className="text-primary">Dashboard</h1>

      <Button className="bg-primary" onClick={onLogout}>
        Login
      </Button>
    </div>
  );
};

export default Dashboard;
