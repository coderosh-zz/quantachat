import React from 'react';

const HeaderUserInfo: React.FC<{ name: string }> = ({ name }) => (
  <div className="text-sm">
    <p className="font-bold">{name}</p>
    {/* <p>Active 1h ago</p> */}
  </div>
);

export default HeaderUserInfo;
