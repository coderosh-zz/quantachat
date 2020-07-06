import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';
import herosvg from './hero.svg';

let oAuthWindow = (callback: any) => {
  const url: string =
    process.env.NODE_ENV === 'development'
      ? 'localhost:4000'
      : window.location.host;

  const consentURL = `${window.location.protocol}//${url}/auth/login`;

  window.open(consentURL, '__blank', 'width=500&height=800');
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'SUCCESS') {
      callback();
    }
  });
};

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const onLoginSuccess = () => {
    authContext.login();
    Toast('Logged In', 'success');
  };

  // return (
  //   <div>
  //     <div>MESSENGER APP</div>
  //     <button
  //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //       onClick={oAuthWindow.bind(null, onLoginSuccess)}
  //     >
  //       Login
  //     </button>
  //   </div>
  // );

  return (
    <div
      style={{ height: '100vh' }}
      className="leading-normal tracking-normal text-white gradient"
    >
      <nav id="header" className="fixed w-full z-30 top-0 text-white">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <a
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              messenger
            </a>
          </div>

          <div className="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center"></ul>
            <button
              id="navAction"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
              onClick={oAuthWindow.bind(null, onLoginSuccess)}
            >
              Login
            </button>
          </div>
        </div>

        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              It's messenger but not by facebook.
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">messenger</h1>
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
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src={herosvg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
