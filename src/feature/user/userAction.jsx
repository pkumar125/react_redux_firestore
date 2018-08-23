import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncAction";
import firebase from "../../app/config/firebase";
import { FETCH_EVENT } from "../event/eventConstraint";

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

export const updateProfileImage = (file, fileName) => async (
  dispatch,
  setState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = { name: imageName };
  try {
    dispatch(asyncActionStart());
    //upload the flile to fb storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);

    //get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;

    //get user doc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);

    //console.log(userDoc);

    // check user has photo if not update profile
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    //add new photo to photos collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError);
    throw new Error("Problem upoading Photo");
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  //const firestore = getFirestore();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || "/assets/user.png",
    displayName: user.displayName,
    host: false
  };
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    });
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Error in attendees");
  }
};

export const cancelGoingToEvent = event => (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "You have removed successfully");
  } catch (error) {
    console.log(error);
    toastr("Error", "Something went wrong");
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const today = new Date(Date.now());
  const firestoreDbConn = firebase.firestore();
  let connroot = firestoreDbConn.collection("event_attendee");
  let query;

  switch (activeTab) {
    case 1: //Past Event
      query = connroot
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: //Future Event
      query = connroot
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: //Hosted Event
      query = connroot
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      //All Event
      query = connroot
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
  }
  try {
    let getSnap = await query.get();

    let events = [];
    for (let i = 0; i < getSnap.docs.length; i++) {
      let evt = await firestoreDbConn
        .collection("events")
        .doc(getSnap.docs[i].data().eventId)
        .get();
      
      events.push({ ...evt.data(), id: evt.id });
    }
  
    dispatch({ type: FETCH_EVENT, payload: { events } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
