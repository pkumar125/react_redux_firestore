import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testAction";

const mapState = state => ({
  data: state.testR.data
});

const action = {
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
  render() {
    return (
      <div>
        <h2>Tst Component {this.props.data} </h2>
        <Button
          onClick={this.props.incrementCounter}
          color="green"
          content="Increment"
        />
        <Button
          onClick={this.props.decrementCounter}
          color="red"
          content="Decrement"
        />
      </div>
    );
  }
}

export default connect(
  mapState,
  action
)(TestComponent);
