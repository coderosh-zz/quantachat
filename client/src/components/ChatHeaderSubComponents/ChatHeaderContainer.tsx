import React from 'react';

const ChatHeaderContainer: React.FC = (props) => (
  <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
    {props.children}
  </div>
);

export default ChatHeaderContainer;
