import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../Menus/SignedInMenu";
import SignOutMenu from "../Menus/SignOutMenu";

class NavBar extends Component {
  state = {
    authnticate: false
  };

  handleSignIn = () => {
    this.setState({ authnticate: true });
  };

  handleSignOut = () => {
    this.setState({ authnticate: false });
    this.props.history.push('/')
  };

  render() {
    const { authnticate } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <img src="/assets/images/logo.png" alt="logo" />
            WowTruck
          </Menu.Item>
          <Menu.Item as={Link} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Create Customer"
            />
          </Menu.Item>

          {authnticate ? (
            <SignedInMenu SignOut={this.handleSignOut} />
          ) : (
            <SignOutMenu SignIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
