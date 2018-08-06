import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default ({ inverted }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content="Loading ..." />
    </Dimmer>
  );
};
