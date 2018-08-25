import React, { Component } from "react";
import { Segment, Header, Comment } from "semantic-ui-react";
import EventDetailChatForm from "./EventDetailChatForm";
import distanceInWords from "date-fns/distance_in_words";
import { Link } from "react-router-dom";

export class EventDetailChat extends Component {
  state = { showReplyForm: false, selectedCommentId: null };
  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };
  handleCloseReplyForm  = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    });
  }
  render() {
    const { eventChat, addEventComment, eventId } = this.props;
    const { showReplyForm,selectedCommentId } = this.state;
    console.log(eventChat);
    return <div>
        <Segment textAlign="center" attached="top" inverted color="teal" style={{ border: "none" }}>
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat && eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment.uid}`}
                    >
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {distanceInWords(comment.date, Date.now())} ago{" "}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReplyForm &&
                        selectedCommentId === comment.id && (
                          <EventDetailChatForm
                            parentId={comment.id}
                            addEventComment={addEventComment}
                            eventId={eventId}
                            form={`reply_${comment.id}`}
                            closeForm={this.handleCloseReplyForm}
                          />
                        )}
                    </Comment.Actions>
                  </Comment.Content>

              <Comment.Group>
                {comment.childNodes && comment.childNodes.map(child => (
                  <Comment key={child.id}>
                    <Comment.Avatar
                      src={child.photoURL || "/assets/user.png"}
                    />
                    <Comment.Content>
                      <Comment.Author
                        as={Link}
                        to={`/profile/${child.uid}`}
                      >
                        {child.displayName}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>
                          {distanceInWords(child.date, Date.now())} ago{" "}
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>{child.text}</Comment.Text>                      
                    </Comment.Content>
                  </Comment>
                ))}
              </Comment.Group>






                </Comment>
              ))}
          </Comment.Group>
        <EventDetailChatForm parentId={0} addEventComment={addEventComment} eventId={eventId} form={"newComment"} />
        </Segment>
      </div>;
  }
}

export default EventDetailChat;
