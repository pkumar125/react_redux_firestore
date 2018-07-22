import React from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch, Redirect } from "react-router-dom";
import SettingNev from "./SettingNev";
import BasicPage from './BasicPage'
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import PhotoPage from './PhotoPage'

const SettingDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
            <Redirect exact from="/settings" to="/settings/basics" />
          <Route path="/settings/basics" component={BasicPage} />
          <Route path="/settings/account" component={AccountPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photo" component={PhotoPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNev />
      </Grid.Column>
    </Grid>
  );
};

export default SettingDashboard;
