import moment from "moment";
import { toastr } from "react-redux-toastr";
export const updateProfile = userinfo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = userinfo;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "PRofile Update Success");
  } catch (error) {
    console.log(error);
  }
};
