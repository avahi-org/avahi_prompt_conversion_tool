import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

type CopyTextButtonProps = {
  textValue: string | null | undefined;
};

const CopyTextButton = ({ textValue }: CopyTextButtonProps) => {
  const [isCopied, setIsCopied] = useState('Copy to Clipboard');

  return (
    <div className="flex items-center justify-between">
      <button
        className="z-30 ml-auto flex items-center gap-2 rounded-full border bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 pb-2.5 text-xs leading-3 text-white outline-none "
        type="button"
        onClick={() => {
          if (textValue) {
            navigator.clipboard.writeText(textValue);
            setIsCopied('Copied!');
            setTimeout(() => {
              setIsCopied('Copy to Clipboard');
            }, 1000);
          }
        }}
      >
        {isCopied}
        <FaCopy />
      </button>
    </div>
  );
};

export default CopyTextButton;
