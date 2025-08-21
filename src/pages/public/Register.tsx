import { useRouteParams } from "@/services/NavigationService";
import React from "react";

const Register: React.FC = () => {
  const { otp = "" } = useRouteParams();

  return (
    <div className="">
      <div>Register {otp} </div>
    </div>
  );
};

export default Register;
