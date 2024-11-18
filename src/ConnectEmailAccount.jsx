import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '275502530024-j0d84r9se1i4rgr6pbt7vdichfv8vl0e.apps.googleusercontent.com'; // Replace with your actual client ID

const ConnectEmailAccount = ({ onEmailAccountConnected }) => {

  const handleLoginSuccess = (response) => {
    const account = {
      email: response.profileObj.email,
      token: response.credential // Adjusted to use the credential field
    };
    onEmailAccountConnected(account); // Pass account info to the parent component
  };

  const handleLoginFailure = (response) => {
    console.error("Failed to connect email account:", response);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="connect-email-account">
        <h3>Connect Your Email Account</h3>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
          type="standard"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default ConnectEmailAccount;



