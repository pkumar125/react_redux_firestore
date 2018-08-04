import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon color="red" name="marker" size="big" />;
const EventDetailMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoomlevel = 14;
  return (
    <Segment attached="bottom" style={{padding:0}}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiUoCN8sAXv82llClwV6iEift_jb1gixY" }}
          defaultCenter={center}
          defaultZoom={zoomlevel}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailMap;
