import React from 'react'
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const UserInfo = ({ email, name }) => {

  return (
    <div>
      <div>
        <span><b>Username:</b> {name} </span>
      </div>
      <div>
        <span><b>Email:</b> {email} </span>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};