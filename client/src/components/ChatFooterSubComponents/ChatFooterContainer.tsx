import React from 'react';

const ChatFooterContainer: React.FC = (props) => (
  <div className="chat-footer flex-none">
    <div className="flex flex-row items-center p-4">{props.children}</div>
  </div>
);
export default ChatFooterContainer;
