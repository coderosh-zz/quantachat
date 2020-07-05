import React from 'react';

const HeaderButton: React.FC = (props) => (
  <a
    href="#"
    className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4"
  >
    <svg
      viewBox="0 0 20 20"
      className="w-full h-full fill-current text-blue-500"
    >
      {props.children}
    </svg>
  </a>
);

export default HeaderButton;
