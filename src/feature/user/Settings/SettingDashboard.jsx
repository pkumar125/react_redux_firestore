import React from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SettingNev from "./SettingNev";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import PhotoPage from "./PhotoPage";
import { updatePassword } from "../../auth/authAction";
import { updateProfile } from '../userAction'
const action = { updatePassword, updateProfile };


const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  userinfo: state.firebase.profile
});

const SettingDashboard = ({ updatePassword, updateProfile, userinfo, providerId}) => {
  return <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basics" />
          <Route path="/settings/basics" render={() => <BasicPage updateProfile={updateProfile} initialValues={userinfo} />} />
          <Route path="/settings/account" render={() => <AccountPage updatePassword={updatePassword} providerId={providerId} />} />
        <Route path="/settings/about" render={() => <AboutPage updateProfile={updateProfile}  initialValues={userinfo} />} />
          <Route path="/settings/photo" component={PhotoPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNev />
      </Grid.Column>
    </Grid>;
};

export default connect(
  mapState,
  action
)(SettingDashboard);
