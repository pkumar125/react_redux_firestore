import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../Menus/SignedInMenu";
import SignOutMenu from "../Menus/SignOutMenu";
import { openModal } from "../../modals/modalAction";
import { signOutUser } from "../../auth/authAction";

const actions = {
  openModal,
  signOutUser
};
const mapState = state => ({
  auth: state.authR
});

class NavBar extends Component {
  
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  handleSignOut = () => {
    this.props.signOutUser();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authnticate  = auth.authnticate;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <img src="/assets/images/logo.png" alt="logo" />
            WowTruck
          </Menu.Item>
          <Menu.Item as={Link} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
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
            <SignOutMenu
              SignIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);
