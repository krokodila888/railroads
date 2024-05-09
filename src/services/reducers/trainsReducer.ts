import {
  EDIT_DATA,
  SET_CURRENT_TRAIN,
  GET_TRAINS_SUCCESS,
} from "../../utils/constants";

import { TTrain } from "../../utils/types";
import type { TTrainsActions } from "../actions/trains";

type TTrainsState = {
  trains: TTrain[] | null;
  currentTrain: TTrain | null;
};

const initialState: TTrainsState = {
  trains: null,
  currentTrain: null,
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
    default: {
      return state;
    }
  }
};
