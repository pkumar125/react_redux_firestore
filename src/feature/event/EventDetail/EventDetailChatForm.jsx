import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import TextArea from "../../../app/common/form/TextArea";
import { Field, reduxForm } from "redux-form";

class EventDetailChatForm extends Component {
  handleCommentSubmit = values => {
    const { parentId, addEventComment, eventId, reset, closeForm } = this.props;

    addEventComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: "comment" })(EventDetailChatForm);
