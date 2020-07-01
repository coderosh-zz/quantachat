import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Toast from '../components/Toast';

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
    Toast('Logged In', 'success');
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => oAuthWindow(onLoginSuccess)}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
