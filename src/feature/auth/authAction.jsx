import { LOGIN_USER, SIGN_OUT_USER } from "./authConstraints";

export const loginUser = authinfo => {
  return {
    type: LOGIN_USER,
    payload: { authinfo }
  };
};

export const signOutUser = () => {
  return { type: SIGN_OUT_USER };
};
