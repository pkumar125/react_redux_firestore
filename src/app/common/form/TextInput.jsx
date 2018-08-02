import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const TextInput = ({ input, width, type, placeholder, meta: { touched, error }, ...rest}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input type={type} {...input}  placeholder={placeholder}   />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default TextInput
