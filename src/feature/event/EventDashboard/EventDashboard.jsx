import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import { firestoreConnect } from "react-redux-firebase";
import { deleteEvent } from "../eventAction";
import EventList from "../EventList/EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.asyncR.loading
});

const mapDispatchToProps = {
  deleteEvent
};

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    console.log(events);
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList onDeleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          {" "}
          <EventActivity />{" "}
        </Grid.Column>
      </Grid>
    );
  }
}
//(firestoreConnect([{ collection: "events" }])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
