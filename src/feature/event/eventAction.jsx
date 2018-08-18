import { toastr } from "react-redux-toastr";
import { moment } from "moment";
import { DELETE_EVENT, FETCH_EVENT } from "./eventConstraint";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncAction";
import { fetchSampleData } from "../../app/data/mockApi";
import { createNewEvent } from "../../app/common/util/helpers";

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

export const cancelToggle = (cancelled, eventId) => async (dispatch, getState, { getFirestore }) => {
         const firestore = getFirestore();
         const message = cancelled ? "Are you sure you want to cancel the event" : "This will reactivate the event. Are you sure ?";
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

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: { eventId }
  };
};

export const fetchEvents = events => {
  return {
    type: FETCH_EVENT,
    payload: events
  };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
