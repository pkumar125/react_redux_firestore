import React, { Component } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";

import { firestoreConnect } from "react-redux-firebase";
import { getEventForDashboard } from "../eventAction";
import EventList from "../EventList/EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const query = [{
  collection:'activity',
  orderBy:['timestamp','desc'],
  limit:5
}]

const mapStateToProps = state => ({
  events: state.eventR,
  loading: state.asyncR.loading,
  activities: state.firestore.ordered.activity
});

const mapDispatchToProps = {
  getEventForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvent: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
  };

  async componentDidMount() {
    let next = await this.props.getEventForDashboard();
   
    if (next && next.docs && next.docs.length > 0) {
      this.setState({
        moreEvent: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvent = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];

    let next = await this.props.getEventForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvent: false,
        loadingInitial: false
      });
    }
  };

  handlecontextRef = contextRef => this.setState({ contextRef });

  render() {
    const { loading, activities } = this.props;
    console.log(activities)
    const { loadingInitial, moreEvent, loadedEvents } = this.state;
    if (loadingInitial) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handlecontextRef}>
            <EventList
              loading={loading}
              events={loadedEvents}
              moreEvent={moreEvent}
              getNextEvent={this.getNextEvent}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity
            activities={activities}
            contextRef={this.state.contextRef}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}
//(firestoreConnect([{ collection: "events" }])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect(query)(EventDashboard));
