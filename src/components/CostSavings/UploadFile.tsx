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
    <div className="flex w-full items-center justify-between rounded-xl">
      <h3 className="font-poppins text-2xl font-semibold leading-9 text-black">
        Conversion Report
      </h3>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleUploadFile}
          className="flex items-center gap-2.5 rounded-md border border-blue-30 bg-white px-3 py-2 font-poppins text-base font-medium text-blue-20"
        >
          <span>Upload file</span>
          <LuUpload />
        </button>
        {isGenerateBtn && (
          <button
            onClick={handleGenerateOutput}
            className="flex items-center gap-2.5 rounded-md border border-blue-30 bg-blue-20 px-3 py-2 font-poppins text-base font-medium text-white"
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
