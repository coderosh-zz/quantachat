import React from 'react';

const MessageContainer: React.FC = (props) => (
  <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
    <div className="flex-1 flex flex-col">
      <main className="flex-grow flex flex-row min-h-0">{props.children}</main>
    </div>
  </div>
);

export default MessageContainer;
