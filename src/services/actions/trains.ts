import {
  EDIT_DATA,
  SET_CURRENT_TRAIN,
  GET_TRAINS_ACTION,
  GET_TRAINS_FAILED,
  GET_TRAINS_SUCCESS,
  SET_VALIDITY,
  EDIT_VALIDITY,
  SET_NEW_DATA,
  EDIT_NEW_DATA,
} from "../../utils/constants";
import { AppDispatch } from "../hooks";
import { api } from "../../utils/Api";
import { TCharacteristics, TTrain, TValidationData } from "../../utils/types";

export interface ISetCurrentTrain {
  readonly type: typeof SET_CURRENT_TRAIN;
  readonly item: TTrain;
}

export interface IEditTrain {
  readonly type: typeof EDIT_DATA;
  readonly editedItem: TTrain;
}

export interface ISetValidity {
  readonly type: typeof SET_VALIDITY;
  readonly items: string[];
}

export interface IEditValidity {
  readonly type: typeof EDIT_VALIDITY;
  readonly number: number;
  readonly status: string;
}

export interface ISetNewData {
  readonly type: typeof SET_NEW_DATA;
  readonly items: TCharacteristics[];
}

export interface IEditNewData {
  readonly type: typeof EDIT_NEW_DATA;
  readonly number: number;
  readonly item: TCharacteristics;
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
  | IEditTrain
  | ISetValidity
  | IEditValidity
  | ISetNewData
  | IEditNewData;

export const setCurrentTrain = (item: TTrain): ISetCurrentTrain => ({
  type: SET_CURRENT_TRAIN,
  item,
});

export const editTrain = (editedItem: TTrain): IEditTrain => ({
  type: EDIT_DATA,
  editedItem,
});

export const setValidity = (items: string[]): ISetValidity => ({
  type: SET_VALIDITY,
  items,
});

export const editValidity = (data: TValidationData): IEditValidity => ({
  type: EDIT_VALIDITY,
  number: data.number,
  status: data.status,
});

export const setNewData = (items: TCharacteristics[]): ISetNewData => ({
  type: SET_NEW_DATA,
  items,
});

export const editNewData = (
  number: number,
  data: TCharacteristics
): IEditNewData => ({
  type: EDIT_NEW_DATA,
  number: number,
  item: data,
});

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
