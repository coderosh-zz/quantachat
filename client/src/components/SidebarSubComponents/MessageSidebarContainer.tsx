import React from 'react';

const MessageSidebarContainer: React.FC = (props) => {
  return (
    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      {props.children}
    </section>
  );
};

export default MessageSidebarContainer;
