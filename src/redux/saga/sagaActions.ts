import { createAction } from "@reduxjs/toolkit";

export const sagaActions = {
    // auth actions
    callLogin: createAction<any>("callLogin"),
    callLogout: createAction("callLogout"),
    tokenExpired: createAction("tokenExpired"),
}