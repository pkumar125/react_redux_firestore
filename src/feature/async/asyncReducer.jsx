import {
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_START,
  ASYNC_ACTION_ERROR
} from "./asyncConstraints";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
  loading: false
};

const asyncStartR = (state) => {
  return { ...state, loading: true };
};

const asyncFinishR = (state) => {
  return { ...state, loading: false };
};

const asyncErrorR = (state) => {
  return { ...state, loading: false };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncStartR,
  [ASYNC_ACTION_FINISH]: asyncFinishR,
  [ASYNC_ACTION_ERROR]: asyncErrorR
});
