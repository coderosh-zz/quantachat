import React from 'react';

const SidebarUserInfoContainer: React.FC = (props) => {
  return (
    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
      {props.children}
    </div>
  );
};

export default SidebarUserInfoContainer;
