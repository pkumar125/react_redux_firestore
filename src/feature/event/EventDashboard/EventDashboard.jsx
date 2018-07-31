import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
//import { firestoreConnect } from "react-redux-firebase";
import { deleteEvent} from "../eventAction";
import EventList from "../EventList/EventList";

const mapStateToProps = state => ({
  eventSR: state.eventR
});

const mapDispatchToProps = {
  deleteEvent
  
};

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { eventSR } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList onDeleteEvent={this.handleDeleteEvent} events={eventSR} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}
//(firestoreConnect([{ collection: "events" }])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDashboard);
