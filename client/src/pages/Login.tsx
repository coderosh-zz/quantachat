import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import herosvg from '../assets/hero.svg';
import oAuthWindow from '../utils/oAuthWindow';
import Nav from '../components/Nav';

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const onLoginSuccess = () => {
    authContext.login();
  };

  return (
    <div
      style={{ minHeight: '100vh' }}
      className="leading-normal tracking-normal text-white gradient"
    >
      <Nav />
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              It's messenger but not by facebook.
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              quantachat
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Message your friend anywhere anytime.
            </p>

            <button
              onClick={oAuthWindow.bind(null, onLoginSuccess)}
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
            >
              But You Need To Login First
            </button>
          </div>
          <div className="hidden md:w-3/5 md:block py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src={herosvg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
