import React, { useState } from 'react';

import CoppyIcon from '../Icons/CoppyIcon';

type CopyTextButtonProps = {
  textValue: string | null | undefined;
};

const CopyTextButton = ({ textValue }: CopyTextButtonProps) => {
  const [isCopied, setIsCopied] = useState('Copy to Clipboard');

  return (
    <div className="flex w-fit items-center justify-between rounded-lg transition-all hover:bg-blue-20">
      <button
        className="z-30 flex items-center gap-1.5 rounded-lg  border border-blue-20 px-2 py-1.5 font-poppins text-base font-medium leading-6 text-blue-20 transition-all hover:text-white"
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
        <CoppyIcon />
        {isCopied}
      </button>
    </div>
  );
};

export default CopyTextButton;
