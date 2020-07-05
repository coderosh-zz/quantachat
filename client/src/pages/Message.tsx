import React, { useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetMessagesQuery,
  OnNewMessageDocument,
  useGetAllConversationsQuery,
} from '../graphql/generated/graphql';
import MessageSidebar from '../components/MessageSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import { AuthContext } from '../contexts/AuthContext';
import MessageContainer from '../components/MessageSubComponents/MessageContainer';
import ChatBodyContainer from '../components/MessageSubComponents/ChatBodyContainer';
import ChatContainer from '../components/MessageSubComponents/ChatContainer';
import MessageViews from '../components/MessageSubComponents/MessageViews';
import scrollToBottom from '../utils/scrollToBottom';
import useComponentDidUpdate from '../hooks/useComponentDidUpdate';

const MessagePage: React.FC = () => {
  const params = useParams() as any;
  const { me } = useContext(AuthContext);
  const bodyRef = useRef<HTMLDivElement>(null);

  const {
    data: ConvoData,
    error: ConvoError,
    loading: ConvoLoading,
    refetch,
  } = useGetAllConversationsQuery({});

  useEffect(() => {
    scrollToBottom(bodyRef, false);

    subscribeToMore({
      document: OnNewMessageDocument,
      updateQuery(prev, data: any) {
        refetch();
        if (
          !prev.getMessage ||
          data.subscriptionData.data.onNewMessage.from.id === me?.id
        )
          return prev;

        const newData = { getMessage: [...prev.getMessage] };
        newData.getMessage.push(data.subscriptionData.data.onNewMessage);

        return newData;
      },
    });
  }, []);

  const { data, error, loading, subscribeToMore } = useGetMessagesQuery({
    variables: {
      id: params.username,
    },
    onCompleted() {
      scrollToBottom(bodyRef);
    },
  });

  useComponentDidUpdate(() => {
    scrollToBottom(bodyRef, false, true);
  }, [data]);

  if (ConvoLoading) return <div>Loading</div>;

  if (loading) return <div>Loading</div>;
  if (error || !data) return <div>Error</div>;

  const msg = data.getMessage.map((m) => ({
    id: m.id,
    text: m.text!,
    from: m.from.id as string,
    to: m.to.id as string,
    profileUrl: m.from.id === me!.id ? m.to.profileUrl : m.from.profileUrl,
  }));

  let msgArr = [];
  for (let i = 0; i < msg.length; i++) {
    if (i == 0) {
      msgArr.push([msg[i]]);
    } else {
      if (msg[i - 1].from == msg[i].from) {
        msgArr[msgArr.length - 1].push(msg[i]);
      } else {
        msgArr.push([msg[i]]);
      }
    }
  }

  return (
    <MessageContainer>
      <MessageSidebar
        params={params}
        data={ConvoData}
        error={ConvoError}
        loading={ConvoLoading}
      />
      <ChatContainer>
        <ChatHeader params={params} />
        <ChatBodyContainer bodyRef={bodyRef}>
          <MessageViews messages={msgArr} />
        </ChatBodyContainer>
        <ChatFooter params={params} bodyRef={bodyRef} />
      </ChatContainer>
    </MessageContainer>
  );
};

export default MessagePage;
