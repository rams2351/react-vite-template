import Images from "@/assets/images";
import Button from "@/components/common/Button";
import { actions } from "@/redux/slices/reducer";
import NavigationService from "@/services/NavigationService";
import React from "react";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actions.callLogin({}));
  };

  return (
    <div>
      <img src={Images.ic_app_logo} />
      <Button className="bg-primary" onClick={onLogout}>
        Login
      </Button>

      <Button onClick={() => NavigationService.navigate("/register", { otp: 123456 })}>Register</Button>
    </div>
  );
};

export default Login;
