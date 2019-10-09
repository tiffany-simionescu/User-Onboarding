import React, {useState} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserInfo from './UserInfo.js';

function MyForm({values, errors, touched}) {
  const [users, setUsers] = useState([]);

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
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms of Service
      </label>
      <button type="submit">Submit</button> 
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
      .required("Password is required"),
    tos: Yup.bool()
      .test(
        'tos',
        'Must accept the Terms and Conditions!',
        value => value === true
      )
      .required(
        'Must accept the Terms and Conditions!'
      ),
  }),
  // End Validation Schema

  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    if (values.email === "alreadytaken@gmail.com") {
      setErrors({email: "That email is already taken"});
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(true);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })
    }
  }
})(MyForm);

export default LoginForm;

// Step 4