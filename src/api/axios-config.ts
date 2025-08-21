import { actions } from "@/redux/slices/reducer";
import { store } from "@/redux/store";
import Config from "@/utils/env-config";
import { showErrorMsg } from "@/utils/helpers";
import axios, { type AxiosRequestHeaders, type AxiosResponse, type Method } from "axios";

const base_url = `${Config.BASE_URL}${Config.API_VERSION}`
const axiosTerminalConsole = false;

interface IHeader {
    "Content-Type"?: string;
    "Accept-Language"?: 'en'
    Accept?: string;
    Authorization?: string,
    platform?: string;
}


class API {
    isTokenExpired = false;


    #api = axios.create({
        baseURL: base_url || '',
        timeout: 1000 * 30,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'X-Platform-Type': 'app',
            'OS-TYPE': 'web',
            'APP-VERSION': Config.API_VERSION || '',
            "TIMEZONE": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
    });


    constructor() {
        this.#api.interceptors.request.use(async (requestConfig) => {
            try {
                if (axiosTerminalConsole) {
                    console.log("-----------AXIOS  Api request is----------- ");
                    console.log("url string ", requestConfig.url);
                    console.log("header ", requestConfig?.headers);
                    console.log("body ", requestConfig?.data);
                    console.log("methodType ", requestConfig?.method)
                }
            } finally {
                return requestConfig;
            }
        });

        const interceptResponse = async (response: AxiosResponse<any>): Promise<any> => {
            try {
                if (axiosTerminalConsole) {
                    console.log("-----------AXIOS  Api Response is----------- ");
                    console.log("url string ", response.config?.url);
                    console.log("header ", response.config?.headers);
                    console.log("body ", response.config?.data);
                    console.log("methodType ", response.config?.method)
                }
                if (response?.data && (JSON.stringify(response?.data).startsWith("<") || JSON.stringify(response?.data).startsWith("\"<"))) {
                    setTimeout(() => {
                        showErrorMsg("Internal Server Error")
                    }, 500);
                } else if (response?.status == 401 || response?.data?.status == 401) {
                    if (!this.isTokenExpired) {
                        this.isTokenExpired = true
                        showErrorMsg(response?.data?.message)
                        store.dispatch(actions.tokenExpired())
                    }
                } else {
                    if (axiosTerminalConsole)
                        console.log(JSON.stringify(response?.data));
                    return response?.data;
                }

            } finally {
            }
        };


        this.#api.interceptors.response.use(
            interceptResponse, // Handles valid response
            (error) => {
                return interceptResponse(error?.response) // Handles error response
            },
        );


    }


    protected request = (url: string, method?: Method, body?: any): Promise<AxiosResponse> => {
        const isMultipart = !!(body && body instanceof FormData);

        const accessToken = localStorage.getItem('accessToken')

        const header: IHeader = {
            "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            'Accept-Language': 'en',
        }

        return this.#api.request({
            method: method,
            url: url,
            data: body,
            headers: header as unknown as AxiosRequestHeaders,
            responseType: url.endsWith('/pdf') ? "blob" : 'json'
        });
    }
}

export { API, type IHeader };
