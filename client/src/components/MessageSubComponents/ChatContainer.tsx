import React from 'react';

const ChatContainer: React.FC = (props) => (
  <section className="flex flex-col flex-auto border-l border-gray-800">
    {props.children}
  </section>
);

export default ChatContainer;
