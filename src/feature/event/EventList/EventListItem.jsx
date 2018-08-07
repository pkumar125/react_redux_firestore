import React, { Component } from "react";
import {Link} from 'react-router-dom'
import format from "date-fns/format";
import EventListAttendee from "./EventListAttendee";
import { Item, Icon, List, Button, Segment } from "semantic-ui-react";

class EventListItem extends Component {
  render() {
    const { event, onDeleteEvent } = this.props;
    return <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
          <Icon name="clock" /> {format(event.date.toDate(), "DD-MM-YY")} at {}
          {format(event.date.toDate(), "hh-mm-ss")}
            |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
             Object.values(event.attendees).map((attendee,index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>
            {event.description}
          </span>
          <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
          <Button as="a" color="red" floated="right" content="Delete" onClick={onDeleteEvent(event.id)} />
        </Segment>
      </Segment.Group>;
  }
}

export default EventListItem;
