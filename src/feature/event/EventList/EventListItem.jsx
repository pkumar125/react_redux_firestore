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
            <Icon name="clock" /> {format(event.date, "DD-MM-YY")} at {}
            {format(event.date, "hh-mm-ss")}
            |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              event.attendees.map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>
            Complete freedom in choosing which loads you bid for, and total
            transparency in the bidding process. You will know exactly how
            much the customer will be paying, and what our commission is. No
            wonder Wowtruck has more drivers than any other platform.
          </span>
          <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
          <Button as="a" color="red" floated="right" content="Delete" onClick={onDeleteEvent(event.id)} />
        </Segment>
      </Segment.Group>;
  }
}

export default EventListItem;
