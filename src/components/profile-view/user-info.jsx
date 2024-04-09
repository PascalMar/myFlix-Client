import React from 'react'
import PropTypes from "prop-types";

export const UserInfo = ({ email, name }) => {

  return (
    <div>
      <span>Username: {name} </span>
      <span>Email: {email} </span>
    </div>
  )
}

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};