import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { incrementCounter, decrementCounter } from "./testAction";
import PlacesAutocomplete from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
//import PlaceInput from "../../app/common/form/PlaceInput";
import { reduxForm } from "redux-form";
const mapState = state => ({
  data: state.testR.data
});

const action = {
  incrementCounter,
  decrementCounter
};
const Marker = () => <Icon color="red" name="marker" size="big" />;
class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = { address: "", scriptLoaded: false };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  onChange = address => this.setState({ address });

  render() {
    const inputProps = { value: this.state.address, onChange: this.onChange };

    return <div>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBiUoCN8sAXv82llClwV6iEift_jb1gixY" }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
            <Marker lat={59.955413} lng={30.337844} text={"Kreyser Avrora"} />
          </GoogleMapReact>
        </div>
        
        <h2>
          1st Component {this.props.data} ##### {this.state.scriptLoaded} 999
        </h2>
        {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
        }
        <Button onClick={this.props.incrementCounter} color="green" content="Increment" />
        <Button onClick={this.props.decrementCounter} color="red" content="Decrement" />
      </div>;
  }
}

export default connect(
  mapState,
  action
)(reduxForm({ form: "TestComponent" })(TestComponent));
