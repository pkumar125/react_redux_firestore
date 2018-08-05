import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import TextInput from '../../../app/common/form/TextInput';
import {loginUser} from '../authAction'

const action = { loginUser }

const LoginForm = ({ loginUser, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(loginUser)} >
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal" onClick={loginUser}>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, action)(reduxForm({form:'loginForm'})(LoginForm));