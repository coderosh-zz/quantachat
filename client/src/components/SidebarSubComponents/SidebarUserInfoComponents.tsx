import React from 'react';

export const UserInfoName: React.FC<{ new: boolean; name: string }> = (
  props
) => <p className={props.new ? 'font-bold' : ''}>{props.name}</p>;

export const UserInfoLastMessage: React.FC<{ lastmsg: string }> = (props) => (
  <div className="min-w-0">
    <p className="truncate">{props.lastmsg}</p>
  </div>
);

export const UserInfoTime: React.FC<{ time: string }> = (props) => (
  <p className="ml-2 whitespace-no-wrap">{props.time}</p>
);

export const UserInfoMessageTimeContainer: React.FC<{ new: boolean }> = (
  props
) => (
  <div
    className={`flex items-center text-sm ${
      props.new ? 'font-bold' : 'text-gray-600 '
    }`}
  >
    {props.children}
  </div>
);
