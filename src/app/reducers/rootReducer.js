import { combineReducers } from "redux";
import testReducer from "../../feature/testarea/testReducer";

const rootReducer = combineReducers({
  test: testReducer
});

export default rootReducer;
