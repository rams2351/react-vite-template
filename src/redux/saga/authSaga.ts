import ApiService from "@/api/ApiService";
import { actions } from "@/redux/slices/reducer";
import LoadingService from "@/services/LoadingService";
import type { Action, APIResponse } from "@/types";
import { showErrorMsg, showSuccessMsg } from "@/utils/helpers";
import { call, put, takeLatest } from "redux-saga/effects";

function* callLogin({ payload }: Action): Generator<any, any, any> {
    try {
        const res = (yield call(ApiService.callLogin, payload)) as APIResponse;
        console.log('RES', res)
        if (res.status == 200) {
            yield put(actions.doLogin(res.data))
            localStorage.setItem('accessToken', res.data.accessToken);
            showSuccessMsg("Login successfully!")
        } else {
            showErrorMsg(res.message);
        }
    }
    catch (error: any) {
        showErrorMsg(error?.message);
        console.log("Catch Error", error);
    }
}

function* callLogout(): Generator<any, any, any> {

    try {
        LoadingService.show()
        const res = (yield call(ApiService.callLogout)) as APIResponse;
        if (res.status == 200) {
            // yield put(actions.doLogout(res.data))
            showSuccessMsg("Logout successfully!")
        } else {
            showErrorMsg(res.message);
        }
        LoadingService.show()
    }
    catch (error) {
        console.log("Catch Error", error);
    } finally {
        yield put(actions.tokenExpired());
    }
}

function* tokenExpired(): Generator<any, any, any> {
    LoadingService.show()
    try {
        localStorage.removeItem('accessToken')
        yield put(actions.doLogout())
        LoadingService.hide()
    }
    catch (error) {
        console.log("Catch Error", error);
        LoadingService.hide()
    }

}




export default function* watchAuth() {
    yield takeLatest(actions.callLogin.toString(), callLogin);
    yield takeLatest(actions.callLogout.toString(), callLogout);
    yield takeLatest(actions.tokenExpired.toString(), tokenExpired);
}