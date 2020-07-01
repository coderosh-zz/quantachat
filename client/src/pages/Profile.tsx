import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext.me) {
    authContext.logout();
    return null;
  }
  return (
    <div>
      <h1>MESSENGER</h1>
      <div>
        <button onClick={authContext.logout}>Logout</button>
        <div>{authContext.me.name}</div>
        <img src={authContext.me.profileUrl} alt="image" />
      </div>
    </div>
  );
};

export default ProfilePage;
