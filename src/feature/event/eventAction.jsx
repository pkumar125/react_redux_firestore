import { toastr } from "react-redux-toastr";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT
} from "./eventConstraint";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncAction";
import { fetchSampleData } from "../../app/data/mockApi";

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: { event }
      });
      toastr.success("Success", "Event Created successfully");
    } catch (error) {
      toastr.error("Error", "Not able to create Event");
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: { event }
      });
      toastr.success('Success', 'Event update success')
    } catch (error) {
      toastr.error("Error", "Event Update Failed");
    }
  };
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
