import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { TAppActions, store } from "./store";
import type { ThunkDispatch } from "redux-thunk";
import type { TypedUseSelectorHook } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export const useAppDispatch: () => AppDispatch = dispatchHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
