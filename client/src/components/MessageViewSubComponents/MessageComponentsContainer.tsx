import React from 'react';

const MessageComponentsContianer: React.FC = (props) => {
  return (
    <div className="messages text-gray-700 grid grid-flow-row gap-2">
      {props.children}
    </div>
  );
};

export default MessageComponentsContianer;
