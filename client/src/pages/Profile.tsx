import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Nav from '../components/Nav';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useGetUserByIdQuery } from '../graphql/generated/graphql';

const ProfilePage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const params = useParams() as any;
  const history = useHistory();

  const { data: UserData, loading, error } = useGetUserByIdQuery({
    variables: {
      id: params.id,
    },
  });

  if (loading) return null;

  if (!authContext.me) {
    authContext.logout();
    return null;
  }

  let data: any;
  if (params.id === 'me') {
    data = authContext.me;
  } else {
    data = UserData?.user;
  }

  if (!UserData?.user && !data) {
    history.push('/profile/me');
    return null;
  }

  return (
    <div
      style={{ height: '100vh' }}
      className="leading-normal tracking-normal text-white gradient-2"
    >
      <Nav />
      <div className="pt-10">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
            <div>
              <div>
                <img
                  className="w-full h-56 object-cover object-center"
                  src={data.profileUrl}
                  alt="avatar"
                />
              </div>
              <div className="flex items-center px-6 py-3 bg-gray-900">
                <span className="text-white font-semibold text-lg">@</span>
                <span className="mx-3 text-white">{data.username}</span>
              </div>
              <div className="py-4 px-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {data.name}
                </h1>
                <p className="py-2 text-lg text-gray-700">{data.email}</p>
                <p className="py-2 text-lg text-gray-700">
                  <Link to={`/message/${data.id}`}>Message</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
