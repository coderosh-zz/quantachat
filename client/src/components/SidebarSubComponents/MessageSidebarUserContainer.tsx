import React from 'react';

interface MessageSidebarContainerProps {
  active: boolean;
}

const MessageSidebarUserContainer: React.FC<MessageSidebarContainerProps> = (
  props
) => {
  return (
    <div
      className={`flex justify-between items-center p-3  mb-1 ${
        props.active ? 'bg-gray-800' : 'hover:bg-gray-800'
      } rounded-lg relative`}
    >
      {props.children}
    </div>
  );
};

export default MessageSidebarUserContainer;
