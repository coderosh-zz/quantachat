import React, { useState, useRef } from 'react';
import {
  useCreateNewMessageMutation,
  GetMessagesQuery,
  GetMessagesDocument,
} from '../graphql/generated/graphql';
import scrollToBottom from '../utils/scrollToBottom';
import useComponentDidUpdate from '../hooks/useComponentDidUpdate';
import ChatFooterContainer from './ChatFooterSubComponents/ChatFooterContainer';
import FooterButton from './ChatFooterSubComponents/FooterButton';
import FooterForm from './ChatFooterSubComponents/FooterForm';

interface ChatFooterProps {
  params: any;
  bodyRef: React.RefObject<HTMLDivElement>;
}

const ChatFooter: React.FC<ChatFooterProps> = (props) => {
  const [input, setInput] = useState('');

  const [createNewMessageMutation, { data }] = useCreateNewMessageMutation({
    variables: {
      to: props.params.username,
      text: input,
    },
    update: (cache, { data }) => {
      try {
        if (!data) return;

        const messages = cache.readQuery<GetMessagesQuery>({
          query: GetMessagesDocument,
          variables: { id: data.createNewMessage.to.id },
        });
        cache.writeQuery({
          query: GetMessagesDocument,
          data: {
            getMessage: [...messages!.getMessage, data!.createNewMessage],
          },
          variables: { id: data.createNewMessage.to.id },
        });
      } catch (e) {
        console.log(e);
      }
    },
    onCompleted() {
      setInput('');
    },
  });

  useComponentDidUpdate(() => {
    scrollToBottom(props.bodyRef, true, true);
  }, [data]);

  return (
    <ChatFooterContainer>
      <FooterButton
        setInput={setInput}
        createNewMessageMutation={createNewMessageMutation}
      />

      <FooterForm
        input={input}
        setInput={setInput}
        createNewMessageMutation={createNewMessageMutation}
      />
    </ChatFooterContainer>
  );
};

export default ChatFooter;
