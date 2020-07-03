import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface UserComponentProps {
  active?: boolean;
  new?: boolean;
  seen?: boolean;
  data: {
    name: string;
    photo: string;
    lastmsg: string;
    time: string;
  };
}

const userDatas: UserComponentProps[] = [
  {
    active: true,
    new: false,
    seen: false,
    data: {
      name: 'Roshan Acharya',
      photo: 'https://randomuser.me/api/portraits/men/33.jpg',
      lastmsg: 'Oho',
      time: '1m',
    },
  },
];

const UserComponent: React.FC<UserComponentProps> = (props) => {
  return (
    <div
      className={`flex justify-between items-center p-3 ${
        props.active ? 'bg-gray-800' : 'hover:bg-gray-800'
      } rounded-lg relative`}
    >
      <div className="w-16 h-16 relative flex flex-shrink-0">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={props.data.photo}
          alt=""
        />
        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
          <div className="bg-green-500 rounded-full w-3 h-3"></div>
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
        <p className={props.new ? 'font-bold' : ''}>{props.data.name}</p>
        <div
          className={`flex items-center text-sm ${
            props.new ? 'font-bold' : 'text-gray-600 '
          }`}
        >
          <div className="min-w-0">
            <p className="truncate">{props.data.lastmsg}</p>
          </div>
          <p className="ml-2 whitespace-no-wrap">{props.data.time}</p>
        </div>
      </div>
      {props.new && (
        <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
      )}
      {props.seen && (
        <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
          <img
            className="rounded-full w-full h-full object-cover"
            alt="user2"
            src={props.data.photo}
          />
        </div>
      )}
    </div>
  );
};

const MessageSidebar: React.FC = () => {
  const { me } = useContext(AuthContext);
  return (
    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      <div className="header p-4 flex flex-row justify-between items-center flex-none">
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <img
            className="rounded-full w-full h-full object-cover"
            alt="ravisankarchinnam"
            src={me!.profileUrl}
          />
        </div>
        <p className="text-md font-bold hidden md:block group-hover:block">
          Messenger
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
      <div className="search-box p-4 flex-none">
        <form>
          <div className="relative">
            <label>
              <input
                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text"
                placeholder="Search Messenger"
              />
              <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path
                    fill="#bbb"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                  />
                </svg>
              </span>
            </label>
          </div>
        </form>
      </div>

      <div className="contacts p-2 flex-1 overflow-y-scroll">
        {userDatas.map((user, index) => (
          <UserComponent key={index} {...user} />
        ))}
      </div>
    </section>
  );
};

export default MessageSidebar;
