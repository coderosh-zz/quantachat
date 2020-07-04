import React, { useEffect, useContext, useRef } from 'react';
import {
  useGetMessagesQuery,
  OnNewMessageDocument,
  useGetAllConversationsQuery,
} from '../graphql/generated/graphql';
import MessageSidebar from '../components/MessageSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import MessageView from '../components/MessageView';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import client from '../graphql/client';

export const scrollToBottom = (bodyRef: React.RefObject<HTMLDivElement>) => {
  if (!bodyRef.current) return;
  bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
};

const MessagePage: React.FC = () => {
  const params = useParams() as any;
  const { me } = useContext(AuthContext);
  const bodyRef = useRef<HTMLDivElement>(null);

  const {
    data: ConvoData,
    error: ConvoError,
    loading: ConvoLoading,
    refetch,
  } = useGetAllConversationsQuery({ notifyOnNetworkStatusChange: true });

  useEffect(() => {
    subscribeToMore({
      document: OnNewMessageDocument,
      updateQuery(prev, data: any) {
        refetch();

        if (
          !prev.getMessage ||
          data.subscriptionData.data.onNewMessage.from.id === me?.id
        )
          return prev;

        const newData = {
          getMessage: [...prev.getMessage],
        };

        newData.getMessage.push(data.subscriptionData.data.onNewMessage);

        setTimeout(() => {
          scrollToBottom(bodyRef);
        }, 0);

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

  if (loading) return <div>Loading</div>;
  if (error || !data) return <div>Error</div>;
  const msg = data.getMessage.map((m: any) => ({
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
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <MessageSidebar
            params={params}
            data={ConvoData}
            error={ConvoError}
            loading={ConvoLoading}
          />
          <section className="flex flex-col flex-auto border-l border-gray-800">
            <ChatHeader />
            <div
              ref={bodyRef}
              className="chat-body p-4 overflow-y-scroll mt-auto"
            >
              {msgArr.map((m) => (
                <MessageView messages={m} key={Math.random()} />
              ))}
            </div>
            <ChatFooter params={params} bodyRef={bodyRef} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MessagePage;
