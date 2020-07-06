import React, { useContext } from 'react';
import oAuthWindow from '../utils/oAuthWindow';
import { AuthContext } from '../contexts/AuthContext';

const Nav: React.FC = (props) => {
  const authContext = useContext(AuthContext);

  const onLoginSuccess = () => {
    authContext.login();
  };

  return (
    <nav className="flex justify-between w-full text-white p-4 border-b border-blue-900 px-8">
      <a href="/">
        <span className="font-semibold text-xl tracking-tight">QuantaChat</span>
      </a>
      <div className="md:items-center md:w-auto flex">
        <div className="flex text-sm">
          {authContext.isAuth ? (
            <button
              onClick={authContext.logout}
              className="p-2 ml-2 bg-white text-gray-800 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={oAuthWindow.bind(null, onLoginSuccess)}
              className="p-2 ml-2 bg-white text-gray-800 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// {!authContext.isAuth ? (
//     <button
//       id="navAction"
//       className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
//       onClick={oAuthWindow.bind(null, onLoginSuccess)}
//     >
//       Login
//     </button>
//   ) : (
//     <React.Fragment>
//       <button
//         id="navAction"
//         className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
//         onClick={authContext.logout}
//       >
//         Logout
//       </button>
//     </React.Fragment>
//   )}

export default Nav;
