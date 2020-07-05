import React from 'react';

const MessageSenderImage: React.FC<{ profileUrl: string }> = (props) => {
  return (
    <div>
      <div className="w-8 h-8 text-sm relative flex flex-shrink-0 mr-4">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={props.profileUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default MessageSenderImage;
