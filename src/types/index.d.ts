import { RootState } from '@redux/store';


declare module 'react-redux' {
    // Extend default RootState with your own type
    interface DefaultRootState extends RootState { }
    export function useSelector<TSelected>(
        selector: (state: RootState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean
    ): TSelected;
}

declare module '*.png' {
    const value: string;
    export default value;
}

export interface IUserSlice {
    isLogin: boolean
}

export interface Action<P = any, T = any> {
    type: T;
    payload: P;
}

export interface APIResponse {
    status: number;
    message?: string;
    data?: any;
    [key: string]: any;
}

