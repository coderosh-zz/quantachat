import React from 'react';

interface MessageSidebarImageProps {
  photo: string;
  name: string;
  online?: boolean;
}

const MessageSidebarImage: React.FC<MessageSidebarImageProps> = (props) => (
  <div className="w-16 h-16 relative flex flex-shrink-0">
    <img
      className="shadow-md rounded-full w-full h-full object-cover"
      src={props.photo}
      alt={props.name}
    />
    {props.online && (
      <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
        <div className="bg-green-500 rounded-full w-3 h-3"></div>
      </div>
    )}
  </div>
);

export default MessageSidebarImage;
