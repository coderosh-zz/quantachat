import React from 'react';
import MessageView from '../MessageView';

const MessageViews: React.FC<{ messages: any }> = ({ messages }) => {
  return messages.map((m: any) => <MessageView messages={m} key={m[0].id} />);
};

export default MessageViews;
