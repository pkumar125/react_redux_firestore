import { toastr } from "react-redux-toastr";
import { moment } from "moment";
import firebase from "../../app/config/firebase";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncAction";
import { createNewEvent } from "../../app/common/util/helpers";
import { FETCH_EVENT } from "./eventConstraint";

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add("events", newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success("Success", "Event Created successfully");
    } catch (error) {
      toastr.error("Error", "Not able to create Event");
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }

    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success", "Event update success");
    } catch (error) {
      toastr.error("Error", "Event Update Failed");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event"
    : "This will reactivate the event. Are you sure ?";
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};
export const getEventForDashboard = lastEvent => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventRef = firestore.collection("events");
  //const eventQuery = eventRef.where("date", ">=", today);
  try {
    dispatch(asyncActionStart());
    let startAfter = lastEvent && (await eventRef.doc(lastEvent.id).get());
    let query;
    lastEvent
      ? (query = eventRef
          .where("date", ">", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventRef
          .where("date", ">", today)
          .orderBy("date")
          .limit(2));
    let querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENT, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
