import React from 'react';

const HeaderUserImage: React.FC<{ profileUrl: string; name: string }> = ({
  profileUrl,
  name,
}) => (
  <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
    <img
      className="shadow-md rounded-full w-full h-full object-cover"
      src={profileUrl}
      alt={name}
    />
  </div>
);

export default HeaderUserImage;
