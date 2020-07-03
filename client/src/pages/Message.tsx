import React from 'react';
import { useGetMessagesQuery } from '../graphql/generated/graphql';
import MessageSidebar from '../components/MessageSidebar';
import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import MessageView from '../components/MessageView';
import { useParams } from 'react-router-dom';

const MessagePage: React.FC = () => {
  const params = useParams() as any;
  const { data, error, loading } = useGetMessagesQuery({
    variables: {
      id: params.username,
    },
  });

  if (loading) return <div>Loading</div>;
  if (error || !data) return <div>Error</div>;
  const msg = data.getMessage.map((m) => ({
    text: m.text!,
    from: m.from.id as string,
    to: m.to.id as string,
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
          <MessageSidebar />
          <section className="flex flex-col flex-auto border-l border-gray-800">
            <ChatHeader />
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
              {msgArr.map((m) => {
                return <MessageView messages={m} key={Math.random()} />;
              })}
            </div>
            <ChatFooter params={params} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MessagePage;
