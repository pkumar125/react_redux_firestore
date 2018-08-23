import React, { Component } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";

class EventList extends Component {
  render() {
    const { events, getNextEvent, loading, moreEvent } = this.props;
    return (
      <div>
        <h2>Event List</h2>
        {events &&
          events.length !== 0 && (
          <InfiniteScroll pageStart={0}
            loadMore={getNextEvent}
            hasMore={!loading && moreEvent}
            initialLoad={false}>
              {events &&
                events.map(event => (
                  <EventListItem key={event.id} event={event} />
                ))}
            </InfiniteScroll>
          )}
      </div>
    );
  }
}

export default EventList;
