import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import testReducer from "../../feature/testarea/testReducer";
import eventReducer from "../../feature/event/eventReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  testR: testReducer,
  eventR: eventReducer
});

export default rootReducer;
