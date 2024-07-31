import React from 'react';
import { LuUpload } from 'react-icons/lu';
import { RiAiGenerate } from 'react-icons/ri';

type UploadFileProps = {
  handleUploadFile: () => void;
  isGenerateBtn?: boolean;
  handleGenerateOutput: () => void;
};

const UploadFile = ({
  handleUploadFile,
  isGenerateBtn,
  handleGenerateOutput,
}: UploadFileProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-y-3 rounded-xl md:flex-row md:items-center">
      <h3 className="font-poppins text-2xl font-semibold leading-9 text-black">
        Conversion Report
      </h3>

      <div className="flex w-full flex-col items-center gap-2.5 sm:flex-row md:w-auto">
        <button
          onClick={handleUploadFile}
          className="flex w-full items-center gap-2.5 rounded-md border border-blue-30 bg-white px-3 py-2 font-poppins text-base font-medium text-blue-20 md:w-auto"
        >
          <span>Upload file</span>
          <LuUpload />
        </button>

        {isGenerateBtn && (
          <button
            onClick={handleGenerateOutput}
            className="flex w-full items-center gap-2.5 rounded-md border border-blue-30 bg-blue-20 px-3 py-2 font-poppins text-base font-medium text-white md:w-auto"
          >
            <span>Generate output</span>
            <RiAiGenerate />
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
