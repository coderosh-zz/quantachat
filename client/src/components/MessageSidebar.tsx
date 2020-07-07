import React, { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import MessageSidebarImage from './SidebarSubComponents/MessageSidebarImage';
import SidebarSeenImage from './SidebarSubComponents/SidebarSeenImage';
import MessageSidebarUserContainer from './SidebarSubComponents/MessageSidebarUserContainer';
import SidebarNewMessageDot from './SidebarSubComponents/SidebarNewMessageDot';
import SidebarUserInfoContainer from './SidebarSubComponents/SidebarUserInfoContainer';
import {
  UserInfoName,
  UserInfoLastMessage,
  UserInfoTime,
  UserInfoMessageTimeContainer,
} from './SidebarSubComponents/SidebarUserInfoComponents';
import MessageSidebarContainer from './SidebarSubComponents/MessageSidebarContainer';
import MessageSidebarSearchBox from './SidebarSubComponents/MessageSidebarSearchBox';
import MessageSidebarHeader from './SidebarSubComponents/MessageSidebarHeader';
import SidebarUserComponentContainer from './SidebarSubComponents/SidebarUserComponentContainer';
import { useGetAllUsersQuery } from '../graphql/generated/graphql';

interface UserComponentProps {
  active?: boolean;
  new?: boolean;
  seen?: boolean;
  data: {
    id: string;
    name: string;
    photo: string;
    lastmsg?: string;
    time?: string;
  };
}

const UserComponent: React.FC<UserComponentProps> = (props) => {
  return (
    <Link to={'/message/' + props.data.id}>
      <MessageSidebarUserContainer active={props.active || false}>
        <MessageSidebarImage name={props.data.name} photo={props.data.photo} />
        <SidebarUserInfoContainer>
          <UserInfoName name={props.data.name} new={props.new || false} />
          <UserInfoMessageTimeContainer new={props.new || false}>
            <UserInfoLastMessage lastmsg={props.data.lastmsg!} />
            <UserInfoTime time={props.data.time!} />
          </UserInfoMessageTimeContainer>
        </SidebarUserInfoContainer>
        <SidebarNewMessageDot new={props.new || false} />
        <SidebarSeenImage seen={props.seen || false} photo={props.data.photo} />
      </MessageSidebarUserContainer>
    </Link>
  );
};

interface MessageSidebarProps {
  params: any;
  data: any;
  error: any;
  loading: any;
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({ data, params }) => {
  const { me } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchDatas, setSearchDatas] = useState<Array<any>>([]);

  const { data: allUsersData, loading } = useGetAllUsersQuery();

  if (loading) return <div>Loading</div>;
  if (!data || !allUsersData) return <div>Something went wrong</div>;

  const reqData: UserComponentProps[] = mapUsersToData(
    data.conversations,
    me,
    params
  );

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    const results: any = [];
    allUsersData.users.map((u) => {
      const text = e.target.value.toLowerCase().trim();
      if (
        u.name.toLowerCase().includes(text) ||
        u.username.toLowerCase().includes(text)
      )
        results.push(u);
    });
    setSearchDatas(results);
  };

  return (
    <MessageSidebarContainer>
      <MessageSidebarHeader profileUrl={me!.profileUrl} />
      <MessageSidebarSearchBox
        searchInput={searchInput}
        setSearchInput={handleUserSearch}
      />

      {searchInput !== '' ? (
        <div>
          {searchDatas.map((data: any) => {
            return (
              <UserComponent
                key={Math.random()}
                data={{
                  id: data.id,
                  name: data.name,
                  photo: data.profileUrl,
                }}
              />
            );
          })}
        </div>
      ) : (
        <SidebarUserComponentContainer>
          {reqData.map((user) => (
            <UserComponent key={user.data.id} {...user} />
          ))}
        </SidebarUserComponentContainer>
      )}
    </MessageSidebarContainer>
  );
};

const mapUsersToData = (conversations: any[], me: any, params: any) => {
  return conversations.map((convo: any) => {
    const u = convo.from.id === me!.id ? convo.to : convo.from;
    return {
      active: u.id === params.username,
      new: false,
      seen: false,
      data: {
        id: u.id,
        name: u.name,
        lastmsg: convo.text || '',
        photo: u.profileUrl,
        time: '',
      },
    };
  });
};

export default MessageSidebar;
