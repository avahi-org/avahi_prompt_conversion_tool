import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

import PdfIcon from './Icons/PdfIcon';

type GenerateReportProps = {
  handleClick: () => void;
  isLoad?: boolean;
};

const GenerateReport = ({ handleClick, isLoad }: GenerateReportProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-blue-5 px-5 py-9 md:flex-row md:px-14 2xl:px-[84px]">
      <div className="flex flex-col gap-2">
        <h4 className="font-poppins text-xl font-medium text-black sm:text-2xl">
          Looking to export your conversion?
        </h4>
        <p className="font-poppins text-sm font-medium text-gray-75 sm:text-base">
          Conversions and conversion history are available to download as a
          generated report
        </p>
      </div>
      <button
        onClick={handleClick}
        type="button"
        className="flex items-center gap-2.5 whitespace-nowrap rounded-lg bg-blue-20 px-3 py-1.5 font-poppins text-base font-medium text-white transition-all hover:bg-blue-50"
      >
        <span>Generate report</span>
        {isLoad ? <LuLoader2 className="animate-spin" /> : <PdfIcon />}
      </button>
    </div>
  );
};

export default GenerateReport;
