import React from 'react';
import {withFormik, Form, Field} from 'formik';

function MyForm(props) {
  return (
    <Form>
      <Field type="text" name="name" placeholder="Name" />
      <Field type="email" name="email" placeholder="Email" />
      <Field type="password" name="password" placeholder="Password" />
      {/* Terms of Service Checkbox */}
      <button>Submit</button> 
    </Form>
  );
}

const LoginForm = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || "",
      email: email || "",
      password: password || ""
    };
  },

  handleSubmit(values) {
    console.log(values);
  }
})(MyForm);

export default LoginForm;