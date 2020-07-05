import React, { useContext } from 'react';
import MessageTextContainer from './MessageTextContainer';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';
import { AuthContext } from '../../contexts/AuthContext';
// @ts-ignore
import emoji from 'emoji-dictionary';

export interface Message {
  text: string;
  from: string;
  to: string;
  profileUrl: string;
}

const MessageComponent: React.FC<Message> = (props) => {
  const { me } = useContext(AuthContext);
  const isMe = me!.id === props.from;

  const emojiSupport = (text: any) =>
    text.value.replace(
      /:\w+:/gi,
      (name: string) => emoji.getUnicode(name) || name
    );

  return (
    <MessageTextContainer isMe={isMe}>
      <ReactMarkdown
        source={props.text.replace(/\n/gi, '  \n')}
        escapeHtml={true}
        renderers={{ code: CodeBlock, text: emojiSupport }}
      />
    </MessageTextContainer>
  );
};

export default MessageComponent;
