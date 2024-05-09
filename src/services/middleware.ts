// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Middleware, MiddlewareAPI } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// eslint-disable-next-line import/namespace
import { store, TAppActions } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const middleware1 = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    return (next) => (action: TAppActions) => {
      next(action);
    };
  }) as Middleware;
};
