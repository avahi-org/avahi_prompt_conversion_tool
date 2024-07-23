import React from 'react';

import PdfIcon from './Icons/PdfIcon';

type PdfGenerateProps = {
  handleClick: () => void;
};

const PdfGenerate = ({ handleClick }: PdfGenerateProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-blue-5 px-[84px] py-9">
      <div className="flex flex-col gap-2">
        <h4 className="font-poppins text-2xl font-medium text-black">
          Looking to export your conversion?
        </h4>
        <p className="font-poppins text-base font-medium text-gray-75">
          Conversions and conversion history are available to download as a
          generated report
        </p>
      </div>

      <button
        onClick={handleClick}
        type="button"
        className="flex items-center gap-2.5 whitespace-nowrap rounded-lg bg-blue-20 px-3 py-1.5 font-poppins text-base font-medium text-white"
      >
        <span>Generate PDF</span>
        <PdfIcon />
      </button>
    </div>
  );
};

export default PdfGenerate;
