import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserInfo from './UserInfo.js';

function MyForm(props, {values, errors, touched}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(props.status) {
      setUsers([...users, props.status])
    }
  }, [props.status]);

  return (
    <div>
      <h1>User Onboarding</h1>
      <Form>
      
          {props.touched.name && props.errors.name && <p>{props.errors.name}</p>}
          <Field className="field" type="text" name="name" placeholder="Name" />

          {props.touched.email && props.errors.email && <p>{props.errors.email}</p>}
          <Field className="field" type="email" name="email" placeholder="Email" />

          {props.touched.password && props.errors.password && <p>{props.errors.password}</p>}
          <Field className="field" type="password" name="password" placeholder="Password" />
        
        <label>
          {props.touched.tos && props.errors.tos && <p>{props.errors.tos}</p>}
          <Field type="checkbox" name="tos" checked={props.values.tos} />
          Accept Terms of Service
        </label>
        <button type="submit">Submit</button> 
      </Form>

      <UserInfo users={users} />
    </div>
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

  handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {

    // STRETCH - waffle@syrup.com
    if (values.email === "waffle@syrup.com") {
      setErrors({email: "That email is already taken"});
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(true);
          setStatus(res.data);
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