import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import testReducer from "../../feature/testarea/testReducer";
import eventReducer from "../../feature/event/eventReducer";
import modalReducer from "../../feature/modals/modalReducer";
import authReducer from '../../feature/auth/authReducer'
import asyncReducer from "../../feature/async/asyncReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  testR: testReducer,
  eventR: eventReducer,
  modalR: modalReducer,
  authR: authReducer,
  asyncR: asyncReducer
});

export default rootReducer;
