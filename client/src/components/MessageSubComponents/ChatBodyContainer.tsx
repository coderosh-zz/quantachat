import React from 'react';

const ChatBodyContainer: React.FC<{ bodyRef: any }> = ({
  bodyRef,
  children,
}) => (
  <div ref={bodyRef} className="chat-body p-4 overflow-y-scroll mt-auto">
    {children}
  </div>
);

export default ChatBodyContainer;
