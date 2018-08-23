import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

import UserDetailHeader from "./UserDetailHeader";
import UserDetailDescription from "./UserDetailDescription";
import UserDetailPhoto from "./UserDetailPhoto";
import UserDetailEvent from "./UserDetailEvent";
import UserDetailSidebar from "./UserDetailSidebar";
import { userDetailedQuery } from "../userQuery";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents } from "../userAction";
const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.authR.uid) {
    profile = state.firebase.profile;
  } else {
    userUid = ownProps.match.params.id;
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
  }

  return {
    profile,
    userUid,
    events:state.eventR,
    eventsLoading: state.asyncR.loading,
    photos: state.firestore.ordered.photos,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
   
  };
};

const actions = {
  getUserEvents
};

class UserDetailedPage extends Component {

  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log(events);
  }


  changeTab = (e, data) => {
    //console.log(data);
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      match,
      auth,
      requesting,
      events,
      eventsLoading
    } = this.props;
    //console.log(this.changeTab);
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) {
      return <LoadingComponent inverted={true} />;
    }
    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailSidebar isCurrentUser={isCurrentUser} />
        <UserDetailPhoto photos={photos} />
        <UserDetailEvent
          events={events}
          eventsLoading={eventsLoading}
          changeTab={this.changeTab}
         
        />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((authR, userUid) => userDetailedQuery(authR, userUid))
)(UserDetailedPage);
