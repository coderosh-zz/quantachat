import React, { useState } from 'react';
import {
  useCreateNewMessageMutation,
  GetMessagesQuery,
  GetMessagesDocument,
} from '../graphql/generated/graphql';
import { scrollToBottom } from '../pages/Message';

interface ChatFooterProps {
  params: any;
  bodyRef: React.RefObject<HTMLDivElement>;
}

const ChatFooter: React.FC<ChatFooterProps> = (props) => {
  const [input, setInput] = useState('');

  const [
    createNewMessageMutation,
    { data, loading: loadingMutation, error: errorMutation },
  ] = useCreateNewMessageMutation({
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

        setTimeout(() => {
          scrollToBottom(props.bodyRef);
        }, 0);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-center p-4">
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
          </svg>
        </button>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
          </svg>
        </button>

        <form
          className="relative flex-grow"
          onSubmit={(e) => {
            e.preventDefault();
            createNewMessageMutation();
            setInput('');
          }}
        >
          <label>
            <input
              className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Aa"
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
              </svg>
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default ChatFooter;
