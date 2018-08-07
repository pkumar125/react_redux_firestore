import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from "./testConstrant";

import {asyncActionFinish,asyncActionStart} from '../async/asyncAction'

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};


const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const asyncincrementCounter = () => {
  return async dispatch => {
    dispatch(asyncActionStart());
    await delay(1000);
    dispatch({ type: INCREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};

export const asyncdecrementCounter = () => {
  return async dispatch => {
    dispatch(asyncActionStart());
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};
