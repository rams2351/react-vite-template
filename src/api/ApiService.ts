import { API } from "@/api/axios-config";

class ApiProvider extends API {
    callLogin = (body: any) => {
        console.log("---------- doLogin Api Call ---------------");
        return this.request("auth/login", "POST", body);
    }

    callLogout = () => {
        console.log("---------- logout Api Call ---------------");
        return this.request("auth/logout", "POST");
    };
}


const ApiService = new ApiProvider()


export default ApiService;