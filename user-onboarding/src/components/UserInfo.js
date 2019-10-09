import React from 'react';

export default function UserInfo(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
      <p>Terms of Service Accepted: {props.tos}</p>
      <p>Password: {props.password}</p>
    </div>
  );
}