import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import UserDetailHeader from "./UserDetailHeader";
import UserDetailDescription from "./UserDetailDescription";
import UserDetailPhoto from "./UserDetailPhoto";
import UserDetailEvent from "./UserDetailEvent";
import UserDetailSidebar from "./UserDetailSidebar";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const mapState = state => ({
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  auth: state.firebase.auth
});

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    console.log("Photo: " + photos);
    // console.log(profile);
    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailSidebar />
        <UserDetailPhoto photos={photos} />
        <UserDetailEvent />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    null
  ),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);
