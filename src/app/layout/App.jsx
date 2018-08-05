import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../feature/home/HomePage";
import EventDashboard from "../../feature/event/EventDashboard/EventDashboard";
import EventDetailPage from "../../feature/event/EventDetail/EventDetailPage";
import PeopleDashboard from "../../feature/user/PeopleDashboard/PeopleDashboardPage";
import UserDetailPage from "../../feature/user/UserDetail/UserDetailPage";
import SettingDashboard from "../../feature/user/Settings/SettingDashboard";
import NavBar from "../../feature/nav/NavBar/NavBar";
import Eventform from "../../feature/event/EventForm/Eventform";
import TestComponent from "../../feature/testarea/TestComponent";
import ModalManager from "../../feature/modals/ModalManager";


class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailPage} />
                  <Route path="/manage/:id" component={Eventform} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/people/:id" component={UserDetailPage} />
                  <Route path="/settings" component={SettingDashboard} />
                  <Route path="/createEvent" component={Eventform} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}
export default App;
