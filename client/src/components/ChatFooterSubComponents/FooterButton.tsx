import React from 'react';

const FooterButton: React.FC = (props) => (
  <button
    type="button"
    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
  >
    <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
      {props.children}
    </svg>
  </button>
);

export default FooterButton;
