import React from 'react';
import { useGetUserByIdQuery } from '../graphql/generated/graphql';
import ChatHeaderContainer from './ChatHeaderSubComponents/ChatHeaderContainer';
import Flex from './ChatHeaderSubComponents/Flex';
import HeaderButton from './ChatHeaderSubComponents/HeaderButton';
import HeaderUserImage from './ChatHeaderSubComponents/HeaderUserImage';
import HeaderUserInfo from './ChatHeaderSubComponents/HeaderUserInfo';
import { useHistory } from 'react-router-dom';

const ChatHeader: React.FC<{ params: any }> = ({ params }) => {
  const { data, error, loading } = useGetUserByIdQuery({
    variables: {
      id: params.username,
    },
  });

  const history = useHistory();

  if (loading) return <div>Loading</div>;

  if (error) {
    history.push('/profile');
    return null;
  }

  if (!data || !data.user || error) return <div>Something went wrong</div>;

  const { name, profileUrl } = data.user;

  return (
    <ChatHeaderContainer>
      <Flex>
        <HeaderUserImage profileUrl={profileUrl} name={name} />
        <HeaderUserInfo name={name} />
      </Flex>

      <Flex>
        <HeaderButton>
          <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z" />
        </HeaderButton>
      </Flex>
    </ChatHeaderContainer>
  );
};

export default ChatHeader;
