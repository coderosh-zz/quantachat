import React from 'react';

export const UserInfoName: React.FC<{ new: boolean; name: string }> = (
  props
) => <p className={props.new ? 'font-bold' : ''}>{props.name}</p>;

export const UserInfoLastMessage: React.FC<{ lastmsg: string }> = (props) =>
  props.lastmsg ? (
    <div className="min-w-0">
      <p className="truncate break-all">{props.lastmsg.substring(0, 20)}</p>
    </div>
  ) : null;

export const UserInfoTime: React.FC<{ time: string }> = (props) =>
  props.time ? <p className="ml-2 whitespace-no-wrap">{props.time}</p> : null;

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
