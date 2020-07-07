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
import mapMessages from '../utils/mapMessages';
import messagesUpdateQuery from '../utils/messagesUpdateQuery';

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

    const unsubscribe = subscribeToMore({
      document: OnNewMessageDocument,
      updateQuery: messagesUpdateQuery(params, me, refetch),
    });

    return () => unsubscribe();
  }, [params]);

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

  if (loading || ConvoLoading) return <div>Loading</div>;
  if (error || !data) return <div>Error</div>;

  const msg = data.getMessage.map((m) => ({
    id: m.id,
    text: m.text!,
    from: m.from.id as string,
    to: m.to.id as string,
    profileUrl: m.from.id === me!.id ? m.to.profileUrl : m.from.profileUrl,
  }));

  const msgArr = mapMessages(msg);

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
