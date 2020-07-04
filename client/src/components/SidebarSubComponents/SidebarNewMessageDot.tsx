import React from 'react';

const SidebarNewMessageDot: React.FC<{ new: boolean }> = (props) => {
  return props.new ? (
    <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
  ) : null;
};

export default SidebarNewMessageDot;
