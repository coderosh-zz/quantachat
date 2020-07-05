import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// @ts-ignore
import MessageViewContainer from './MessageViewSubComponents/MessageViewContainer';
import MessageSenderImage from './MessageViewSubComponents/MessageSenderImage';
import MessageComponentContainer from './MessageViewSubComponents/MessageComponentsContainer';
import MessageComponent, {
  Message,
} from './MessageViewSubComponents/MessageComponent';

interface MessageViewProps {
  messages: Message[];
}

const MessageView: React.FC<MessageViewProps> = ({ messages }) => {
  const { me } = useContext(AuthContext);
  const isSender = messages[0].from !== me!.id;
  return (
    <React.Fragment>
      <MessageViewContainer isSender={isSender}>
        {isSender && <MessageSenderImage profileUrl={messages[0].profileUrl} />}
        <MessageComponentContainer>
          {messages.map((m) => (
            <MessageComponent key={Math.random()} {...m} />
          ))}
        </MessageComponentContainer>
      </MessageViewContainer>
    </React.Fragment>
  );
};

export default MessageView;
