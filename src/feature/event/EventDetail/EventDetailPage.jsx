import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { withFirestore, firebaseConnect,isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import EventDetailAttendee from "./EventDetailAttendee";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailChat from "./EventDetailChat";
import EventDetailInfo from "./EventDetailInfo";
import { objectToArray,createDataTree } from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userAction";
import { addEventComment } from "../eventAction";

const mapStateToProps = (state,ownProps) => {
  let eventjson = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    eventjson = state.firestore.ordered.events[0];
  }

  return {
    eventjson,
    auth: state.firebase.auth,
    eventChat: !isEmpty(state.firebase.data.event_chat) && 
    objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
};

class EventDetailPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      eventjson,
      eventChat,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment
    } = this.props;
    const attendees =
      eventjson && eventjson.attendees && objectToArray(eventjson.attendees);
    const isHost = eventjson.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)


    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            event={eventjson}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          }<EventDetailInfo event={eventjson} />}
          <EventDetailChat eventChat={chatTree}
            addEventComment={addEventComment}
            eventId={eventjson.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailAttendee attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailPage);
