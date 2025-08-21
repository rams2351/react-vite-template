import watchAuth from "@/redux/saga/authSaga";
import { all, fork } from "redux-saga/effects";


export function* rootSaga() {
    yield all([
        fork(watchAuth),
    ]);
}