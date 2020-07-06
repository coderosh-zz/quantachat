import React, { useState, ChangeEvent } from 'react';
import { useNoFriendsQuery } from '../graphql/generated/graphql';
import { Card } from './Dashboard';
import Nav from '../components/Nav';

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

export default AddFriendsPage;
