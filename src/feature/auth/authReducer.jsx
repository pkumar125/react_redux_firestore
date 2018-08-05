import { LOGIN_USER, SIGN_OUT_USER } from "./authConstraints";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = { currentUser: {} };

const loginR = (state, payload) => {
    return { ...state, authnticate: true, currentUser: payload.authinfo.email };
};

const signoutR = (state, payload) => {
  return { ...state, authnticate: false, currentUser: {} };
};


export default createReducer(initialState,{
    [LOGIN_USER]:loginR,
    [SIGN_OUT_USER]:signoutR
})