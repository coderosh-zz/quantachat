import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

let oAuthWindow = (callback: any) => {
  const url: string =
    process.env.NODE_ENV === 'development'
      ? 'localhost:4000'
      : window.location.host;

  const consentURL = `${window.location.protocol}//${url}/auth/login`;

  window.open(consentURL, '__blank', 'width=500&height=800');
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'SUCCESS') {
      callback();
    }
  });
};

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const onLoginSuccess = () => {
    authContext.login();
  };

  return (
    <div>
      <button className="btn" onClick={() => oAuthWindow(onLoginSuccess)}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
