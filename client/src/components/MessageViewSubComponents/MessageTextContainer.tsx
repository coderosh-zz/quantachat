import React from 'react';

const MessageTextContainer: React.FC<{ isMe: boolean }> = ({
  isMe,
  children,
}) => (
  <div className={`flex items-center group ${isMe ? 'flex-row-reverse' : ''}`}>
    <div
      className={`px-4 py-2 rounded-md ${
        !isMe ? 'bg-gray-800' : 'bg-blue-700'
      } max-w-xs lg:max-w-md text-gray-200 break-all`}
    >
      {children}
    </div>
  </div>
);

export default MessageTextContainer;
