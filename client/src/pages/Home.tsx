import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  return (
    <div>
      <h1>MESSENGER</h1>
      <div>
        <button onClick={authContext.logout}>Logout</button>
        <div>
          {authContext.me ? authContext.me.name : 'Something went wrong'}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
