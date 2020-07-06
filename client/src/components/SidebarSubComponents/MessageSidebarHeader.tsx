import React from 'react';

const MessageSidebarHeader: React.FC<{ profileUrl: string }> = (props) => (
  <div className="header p-4 flex flex-row justify-between items-center flex-none">
    <div className="w-16 h-16 relative flex flex-shrink-0">
      <img
        className="rounded-full w-full h-full object-cover"
        alt="ravisankarchinnam"
        src={props.profileUrl}
      />
    </div>
    <p className="text-md font-bold hidden md:block group-hover:block">
      QuantaChat
    </p>
    <a
      href="#"
      className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block"
    >
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
      </svg>
    </a>
  </div>
);
export default MessageSidebarHeader;
