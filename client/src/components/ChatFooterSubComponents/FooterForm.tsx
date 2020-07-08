import React, { useState, useRef } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

interface FooterFormProps {
  createNewMessageMutation: any;
  setInput: any;
  input: any;
}

const FooterForm: React.FC<FooterFormProps> = ({
  createNewMessageMutation,
  setInput,
  input,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const sendFormRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={sendFormRef}
      className="relative flex-grow"
      onSubmit={(e) => {
        e.preventDefault();
        createNewMessageMutation();
        setShowPicker(false);
      }}
    >
      <span
        style={{
          opacity: showPicker ? 1 : 0,
          pointerEvents: showPicker ? 'all' : 'none',
        }}
        className="absolute bottom-1 right-0"
      >
        <Picker
          onSelect={(e: any) => {
            setInput((prev: any) => prev + e.native);
          }}
          theme="dark"
          title="Messenger"
          showSkinTones={false}
          showPreview={false}
          exclude={['flags']}
        />
      </span>
      <label>
        <textarea
          className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
          value={input}
          onChange={(e) => {
            setShowPicker(false);

            setInput(e.target.value);
          }}
          placeholder="Aa"
          rows={1}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.shiftKey === false) {
              e.preventDefault();
              createNewMessageMutation();
              setShowPicker(false);
            }
          }}
        ></textarea>
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          type="button"
          className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
          </svg>
        </button>
      </label>
    </form>
  );
};

export default FooterForm;
