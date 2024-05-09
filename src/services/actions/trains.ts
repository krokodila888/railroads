import {
  EDIT_DATA,
  SET_CURRENT_TRAIN,
  GET_TRAINS_ACTION,
  GET_TRAINS_FAILED,
  GET_TRAINS_SUCCESS,
} from "../../utils/constants";
import { AppDispatch } from "../hooks";
import { api } from "../../utils/Api";

import { TTrain } from "../../utils/types";

export interface ISetCurrentTrain {
  readonly type: typeof SET_CURRENT_TRAIN;
  readonly item: TTrain;
}

export interface IEditTrain {
  readonly type: typeof EDIT_DATA;
  readonly editedItem: TTrain;
}

export function setCurrentTrain(data: TTrain) {
  return {
    type: SET_CURRENT_TRAIN,
    item: data,
  };
}

export function editTrain(data: TTrain) {
  return {
    type: EDIT_DATA,
    editedItem: data,
  };
}

export interface IGetTrainsAction {
  readonly type: typeof GET_TRAINS_ACTION;
}

export interface IGetTrainsFailedAction {
  readonly type: typeof GET_TRAINS_FAILED;
}

export interface IGetTrainsSuccessAction {
  readonly type: typeof GET_TRAINS_SUCCESS;
  readonly items: ReadonlyArray<TTrain>;
}

export type TTrainsActions =
  | IGetTrainsAction
  | IGetTrainsFailedAction
  | IGetTrainsSuccessAction
  | ISetCurrentTrain
  | IEditTrain;

export const getTrainsAction = (): IGetTrainsAction => ({
  type: GET_TRAINS_ACTION,
});

export const getTrainsFailedAction = (): IGetTrainsFailedAction => ({
  type: GET_TRAINS_FAILED,
});

export const getTrainsSuccessAction = (
  items: Array<TTrain>
): IGetTrainsSuccessAction => ({
  type: GET_TRAINS_SUCCESS,
  items,
});

export const getTrains = () => (dispatch: AppDispatch) => {
  dispatch(getTrainsAction());
  api
    .getTrains()
    .then((res) => {
      if (res) {
        dispatch(getTrainsSuccessAction(res));
      } else {
        dispatch(getTrainsFailedAction());
      }
    })
    .catch((res) => console.log(res));
};
