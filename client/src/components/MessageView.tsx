import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

const MessageComponent: React.FC<Message> = (props) => {
  const { me } = useContext(AuthContext);
  const isMe = me!.id === props.from;

  return (
    <div
      className={`flex items-center group ${isMe ? 'flex-row-reverse' : ''}`}
    >
      <ReactMarkdown
        className={`px-6 py-3 rounded-full ${
          !isMe ? 'bg-gray-800' : 'bg-blue-700'
        } max-w-xs lg:max-w-md text-gray-200`}
        source={props.text}
      />
    </div>
  );
};

interface Message {
  text: string;
  from: string;
  to: string;
  profileUrl: string;
}

interface MessageViewProps {
  messages: Message[];
}

const MessageView: React.FC<MessageViewProps> = (props) => {
  const { me } = useContext(AuthContext);
  return (
    <React.Fragment>
      <div
        className={`flex flex-row ${
          props.messages[0].from !== me!.id ? 'justify-start' : 'justify-end'
        }`}
      >
        {props.messages[0].from !== me!.id && (
          <div className="w-8 h-8 text-sm relative flex flex-shrink-0 mr-4">
            <img
              className="shadow-md rounded-full w-full h-full object-cover"
              src={props.messages[0].profileUrl}
              alt=""
            />
          </div>
        )}
        <div className="messages text-gray-700 grid grid-flow-row gap-2">
          {props.messages.map((m) => (
            <MessageComponent key={Math.random()} {...m} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessageView;
