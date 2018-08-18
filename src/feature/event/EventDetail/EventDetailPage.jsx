import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { withFirestore } from "react-redux-firebase";
import EventDetailAttendee from "./EventDetailAttendee";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailChat from "./EventDetailChat";
import EventDetailInfo from "./EventDetailInfo";
import { objectToArray } from "../../../app/common/util/helpers";
import {goingToEvent, cancelGoingToEvent} from '../../user/userAction'

const mapStateToProps = state => {
  let eventjson = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    eventjson = state.firestore.ordered.events[0];
  }

  return {
    eventjson,
    auth: state.firebase.auth
  };
};

const action = {
  goingToEvent, cancelGoingToEvent
}

class EventDetailPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);    
  }

  async componentWillUnmount(){
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);    

  }

   

  render() {
    const { eventjson, auth,goingToEvent, cancelGoingToEvent } = this.props;
    const attendees =
      eventjson && eventjson.attendees && objectToArray(eventjson.attendees);
    const isHost = eventjson.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader event={eventjson} isHost={isHost}
           isGoing={isGoing} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent} />}
          <EventDetailInfo event={eventjson} />}
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailAttendee attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapStateToProps,action)(EventDetailPage));
