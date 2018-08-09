import { SubmissionError,reset } from "redux-form";
import { closeModal } from "../modals/modalAction";
import { toastr } from "react-redux-toastr";

export const loginUser = authinfo => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(authinfo.email, authinfo.password);
      dispatch(closeModal());
      toastr.success("Success", "Login Success");
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = reginfo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in firebase auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(reginfo.email, reginfo.password);
      console.log(createdUser);

      // update the auth profile
      await createdUser.updateProfile({
        displayName: reginfo.displayName
      });
      // create a new profile in firestore
      let newUser = {
        displayName: reginfo.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`, { ...newUser });
      dispatch(closeModal());
      toastr.success("Success", "New User Creation Success");
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: "popup"
      });
      console.log(user);
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const updatePassword = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase=getFirebase()
  const user = firebase.auth().currentUser
  try {
    await user.updatePassword(creds.newPassword1)
    await dispatch(reset('account'))
    toastr.success('Success', 'Your Password update success')

  }catch(error){
    console.log(error)
    throw new SubmissionError({
      _error:error.message
    })
  }

};

//block 1-   94444 547 311
