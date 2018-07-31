import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailAttendee from "./EventDetailAttendee";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailChat from "./EventDetailChat";
import EventDetailInfo from "./EventDetailInfo";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  

  let eventjson = {};
  if (eventId && state.eventR.length > 0) 
  {
    eventjson = state.eventR.filter(eventjson => eventjson.id === eventId)[0];
   
  }
 
  return { eventjson };
};

const EventDetailPage = ({ eventjson}) => {
  return <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={eventjson} />
      <EventDetailInfo event={eventjson} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
      <EventDetailAttendee attendees={eventjson.attendees} />
      </Grid.Column>
    </Grid>;
};

export default connect(mapStateToProps)(EventDetailPage);
