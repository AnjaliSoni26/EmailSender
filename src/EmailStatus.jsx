import React from 'react';

const EmailStatus = ({ statusData }) => {
  return (
    <div className="email-status">
      <h3>Email Status</h3>
      <ul>
        {statusData.map((status, index) => (
          <li key={index}>{status.email}: {status.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmailStatus;
