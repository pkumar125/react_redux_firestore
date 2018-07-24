import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstrant";
const initialState = {
  data: 49
};

// export const incCounter = (state,payload) => {
//   return {...state, data:state.data+1}
// }

// export const decCounter = (state,payload) => {
//   return {...state, data: state.data-1}
// }

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + 1 };
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - 1 };
    default:
      return state;
  }
};

export default testReducer;
