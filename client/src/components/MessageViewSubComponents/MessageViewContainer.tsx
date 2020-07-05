import React from 'react';

const MessageViewContainer: React.FC<{ isSender: boolean }> = ({
  isSender,
  children,
}) => {
  return (
    <div
      className={`flex flex-row ${isSender ? 'justify-start' : 'justify-end'}`}
    >
      {children}
    </div>
  );
};

export default MessageViewContainer;
