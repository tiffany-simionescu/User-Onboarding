import React from 'react';

export default function UserInfo(props) {
  return (
    <div>
      {props.users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Terms of Service Accepted: Yes</li>
        </ul>
      ))}
    </div>
  );
}