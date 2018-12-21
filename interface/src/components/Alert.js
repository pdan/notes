import React from 'react';

const Alert = ({ message }) => {
  if (message === '' || message === undefined) {
    return ('')
  }
  return (
    <div className="alert">
      <div className="grid-container">
        {message}
      </div>
    </div>
  )
}

export default Alert
