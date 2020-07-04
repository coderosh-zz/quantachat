import React from 'react';

const SidebarUserComponentContainer: React.FC = (props) => {
  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll">
      {props.children}
    </div>
  );
};
export default SidebarUserComponentContainer;
