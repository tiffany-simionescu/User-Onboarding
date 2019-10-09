import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

function MyForm({values, errors, touched}) {
  return (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms of Service
      </label>
      <button>Submit</button> 
    </Form>
  );
}

const LoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  // Validation Schema
  validationSchema: Yup.object().shape({
    name: Yup.string()
    // Create custom error codes
      .max(40, "Please enter no more than 40 characters for your name")
      .required("Name is required"),
    email: Yup.string()
    // Create custom error codes
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
    // Create custom error codes
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),
  // End Validation Schema

  handleSubmit(values) {
    console.log(values);
  }
})(MyForm);

export default LoginForm;