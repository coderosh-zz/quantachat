import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { me } = useContext(AuthContext);

  return (
    <div>
      <h1>Friends</h1>
      {me?.friends.map((f) => (
        <div>{f.name}</div>
      ))}
    </div>
  );
};

export default DashboardPage;
