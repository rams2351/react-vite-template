import { router } from "@/routes";
import { isEmpty } from "lodash";
import { type RelativeRoutingType, useLocation } from "react-router-dom";

interface options {
  replace?: boolean;
  relative?: RelativeRoutingType;
  [key: string]: any;
}

class Navigation {
  router = router;
  navigate = (name: string, options?: options) => {
    const { replace = false, relative = "route", ...state } = options || {};
    if (this.router) {
      this.router.navigate(name, {
        replace: replace,
        state,
        relative,
      });
    }
  };
}

export const useRouteParams = (validate = false) => {
  const locations = useLocation();
  const state = locations.state;

  if (validate && isEmpty(state)) {
    location.replace("/");
  }
  return state || {};
};

const NavigationService = new Navigation();

export default NavigationService;
