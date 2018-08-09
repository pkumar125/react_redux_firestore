import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import TextInput from '../../../app/common/form/TextInput';
import { loginUser, socialLogin} from '../authAction'
import SocialLogin from '../SocialLogin/SocialLogin';

const action = { loginUser, socialLogin }

const LoginForm = ({ loginUser, handleSubmit, error, socialLogin }) => {
  return <Form error size="large" onSubmit={handleSubmit(loginUser)}>
      <Segment>
        <Field name="email" component={TextInput} type="text" placeholder="Email Address" />
        <Field name="password" component={TextInput} type="password" placeholder="password" />
        {error && <Label basic color="red">
            {" "}
            {error}
          </Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
      <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>;
};

export default connect(null, action)(reduxForm({form:'loginForm'})(LoginForm));