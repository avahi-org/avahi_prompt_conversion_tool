import React from 'react';

import ShareIcon from '../Icons/ShareIcon';

const CopyTextButton = () => {
  return (
    <div className="flex w-fit items-center justify-between rounded-lg transition-all hover:bg-blue-20 ">
      <button
        className="z-30 flex items-center gap-1.5 rounded-lg border border-blue-20 px-2 py-1.5 font-poppins text-base font-medium leading-6 text-blue-20 transition-all hover:text-white"
        type="button"
      >
        <span>Share</span>
        <ShareIcon />
      </button>
    </div>
  );
};

export default CopyTextButton;
