import React, { useState, ChangeEvent } from 'react';
import {
  useNoFriendsQuery,
  useAddFriendMutation,
  NoFriendsQuery,
  NoFriendsDocument,
} from '../graphql/generated/graphql';
import Nav from '../components/Nav';
import { onError } from 'apollo-link-error';

const AddFriendsPage: React.FC = (props) => {
  const { data, loading, error } = useNoFriendsQuery({});
  const [searchData, setSearchData] = useState<Array<any>>([]);
  const [input, setInput] = useState('');

  if (loading || !data) return null;
  if (error) return <div>Something went wrong</div>;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setInput(searchText);
    const results = data?.NoFriends.filter(
      (f) =>
        f.name.toLowerCase().includes(searchText) ||
        f.username.toLowerCase().includes(searchText)
    );

    setSearchData(results!);
  };

  return (
    <div
      style={{ minHeight: '100vh' }}
      className="leading-normal tracking-normal text-white gradient-2"
    >
      <Nav />
      <h1 className="font-bold text-center my-5">Add Friends</h1>
      <div className="flex justify-center">
        <input
          value={input}
          className="w-5/6 md:w-5/12 rounded-full py-2 pl-3 pr-10 border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
          placeholder="Search User"
          onChange={handleInputChange}
        />
      </div>
      <div
        style={{ justifyItems: 'center' }}
        className="overflow-y-auto grid grid-cols-1 md:grid-cols-3 justify-center lg:grid-cols-4 p-4"
      >
        {input === ''
          ? data?.NoFriends.map((u) => {
              return <Card key={u.username} {...u} />;
            })
          : searchData.map((u) => {
              return <Card key={u.username} {...u} />;
            })}
      </div>
    </div>
  );
};

const Card: React.FC<{
  username: string;
  profileUrl: string;
  name: string;
  isFriend?: boolean;
  id: string;
}> = (props) => {
  const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
    variables: {
      id: props.id,
    },
    update(cache, { data }) {
      try {
        if (!data) return;

        const frns = cache.readQuery<NoFriendsQuery>({
          query: NoFriendsDocument,
          variables: { id: data.addFriend.id },
        });

        cache.writeQuery({
          query: NoFriendsDocument,
          data: {
            NoFriends: frns?.NoFriends.filter(
              (f) => f.id !== data.addFriend.id
            ),
          },
          variables: { id: data.addFriend.id },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
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
              <p
                className="font-bold cursor-pointer"
                onClick={() => addFriendMutation()}
              >
                Add Friend
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendsPage;
