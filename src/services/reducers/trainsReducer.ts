import {
  EDIT_DATA,
  SET_CURRENT_TRAIN,
  GET_TRAINS_SUCCESS,
  SET_VALIDITY,
  EDIT_VALIDITY,
} from "../../utils/constants";

import { TTrain } from "../../utils/types";
import type { TTrainsActions } from "../actions/trains";

type TTrainsState = {
  trains: TTrain[] | null;
  currentTrain: TTrain | null;
  validity: string[] | null;
};

const initialState: TTrainsState = {
  trains: null,
  currentTrain: null,
  validity: null,
};

export const trainsReducer = (state = initialState, action: TTrainsActions) => {
  switch (action.type) {
    case GET_TRAINS_SUCCESS: {
      return {
        ...state,
        trains: action.items,
      };
    }
    case SET_CURRENT_TRAIN: {
      const newCurrentTrain = action.item;
      return {
        ...state,
        currentTrain: newCurrentTrain,
      };
    }
    case EDIT_DATA: {
      return {
        ...state,
        currentTrain: action.editedItem,
        trains: state.trains?.map((item) => {
          if (item.name !== action.editedItem.name) return item;
          else return action.editedItem;
        }),
      };
    }
    case SET_VALIDITY: {
      return {
        ...state,
        validity: action.items.map(() => "isValid"),
      };
    }
    case EDIT_VALIDITY: {
      const newValidity = state.validity?.map((item: string, num: number) => {
        if (num === action.number) {
          return action.status;
        } else return item;
      });
      return {
        ...state,
        validity: newValidity,
      };
    }
    default: {
      return state;
    }
  }
};
