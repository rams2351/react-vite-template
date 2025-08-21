import type { IUserSlice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserSlice = {
    isLogin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        doLogin: (state) => {
            state.isLogin = true;
        },
        doLogout: (state) => {
            state.isLogin = false
        }
    },
});

export const { doLogin } = userSlice.actions;
