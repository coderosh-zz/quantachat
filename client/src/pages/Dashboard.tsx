import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNoFriendsQuery } from '../graphql/generated/graphql';

const DashboardPage: React.FC = () => {
  const { me } = useContext(AuthContext);

  const { data, loading, error } = useNoFriendsQuery({});

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-bold text-center">Your Friends</h1>
        {me?.friends.map((f) => (
          <Card key={f.username} {...f} isFriend={true} />
        ))}
      </div>

      <div>
        <h1 className="font-bold text-center">Add Friends</h1>
        <div className="overflow-y-auto flex flex-row">
          {!loading &&
            data?.NoFriends.map((u) => {
              return <Card key={u.username} {...u} />;
            })}
        </div>
      </div>
    </div>
  );
};

export const Card: React.FC<{
  username: string;
  profileUrl: string;
  name: string;
  isFriend?: boolean;
}> = (props) => (
  <div className="max-w-sm w-full h-auto py-6 px-3">
    <div className="bg-white shadow-xl rounded-lg overflow-hidden  border-gray-300 border">
      <div className="bg-cover bg-center p-4">
        <img src={props.profileUrl} alt={props.username} />
      </div>
      <div className="p-4">
        <p className="text-3xl text-gray-900">{props.name}</p>
        <p className="text-gray-700">@{props.username}</p>
      </div>
      <div className="flex p-4 border-t border-gray-300 text-gray-700">
        <div className="flex-1 inline-flex items-center">
          {props.isFriend ? (
            <p className="font-bold cursor-pointer">Remove Friend</p>
          ) : (
            <p className="font-bold cursor-pointer">Add Friend</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
