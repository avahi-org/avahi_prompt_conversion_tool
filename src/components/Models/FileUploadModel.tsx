/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import type { Dispatch, SetStateAction } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import type { FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { LuLoader2 } from 'react-icons/lu';

import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import {
  BEDROCK_PROMPT_OPTONS,
  colourStyles,
  GPT_PROMPT_OPTIONS,
} from '@/utils/constant';

import CloseIcon from '../Icons/CloseIcon';
import QuationIcon from '../Icons/QuationIcon';
import SendFileIcon from '../Icons/SendFileIcon';
import UploadIcon from '../Icons/UploadIcon';

const Select = dynamic(() => import('react-select'), { ssr: false });

type FileUploadModelProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  handleUploadFile: () => void;
  isLoading: boolean;
};

interface FileWithPreview extends File {
  preview: string;
}

const FileUploadModel = ({
  isOpen,
  setIsOpen,
  files,
  setFiles,
  handleUploadFile,
  isLoading,
}: FileUploadModelProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedGpt, setSelectedGpt] = useState<undefined | GptOptionDataType>(
    GPT_PROMPT_OPTIONS[0]
  );

  const [selectedBedrock, setSelectedBedrock] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const maxFileSize = 25 * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreview = acceptedFiles
        .filter((file) => file.size <= maxFileSize)
        .map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ) as FileWithPreview[];

      const filteredFiles = filesWithPreview.filter(
        (file) => !files.some((existingFile) => existingFile.name === file.name)
      );

      if (acceptedFiles.length !== filesWithPreview.length) {
        setError('Some files exceed the maximum size limit of 25MB');
      } else {
        setError(null);
      }

      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    },
    [files]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const hasSizeError = rejectedFiles.some((file) =>
      file.errors.some((err) => err.code === 'file-too-large')
    );
    if (hasSizeError) {
      setError('Some files exceed the maximum size limit of 25MB');
    } else {
      setError('Invalid File Format');
    }
  }, []);

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name)
    );
  };

  const renderFileList = () => {
    return files.map((file, index) => (
      <div
        key={index}
        className="flex items-start justify-between rounded-lg border-2 border-blue-30 p-6"
      >
        <div className="flex flex-col items-start justify-between gap-1.5">
          <span className="font-poppins text-base font-normal leading-6 text-blackDark-100">
            {file.name}
          </span>
          <span className="font-poppins text-xs leading-5 text-[#9B9B9B]">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>

        <button
          type="button"
          onClick={() => removeFile(file)}
          aria-label="Remove file"
        >
          <CloseIcon />
        </button>
      </div>
    ));
  };

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxSize: maxFileSize,
    multiple: true,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/5 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div className="zoomIn relative w-full  max-w-[580px] rounded-2xl shadow-primaryBox">
            <div className="flex w-full flex-col gap-6 rounded-t-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-poppins text-2xl font-medium leading-9 text-black">
                  Upload files
                </h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setFiles([]);
                  }}
                  aria-label="Close upload modal"
                >
                  <CloseIcon />
                </button>
              </div>

              {files && files.length > 0 && (
                <>
                  <div className="table-scrollbar flex max-h-[130px] flex-col gap-2 overflow-y-auto px-1">
                    {renderFileList()}
                  </div>

                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-poppins text-sm leading-5 text-black">
                        Convert from:
                      </span>
                      <Select
                        options={GPT_PROMPT_OPTIONS}
                        defaultValue={selectedGpt}
                        onChange={(value) => setSelectedGpt(value as any)}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        styles={colourStyles}
                        placeholder="Select"
                        className="w-fit font-poppins text-base font-medium leading-6"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-poppins text-sm leading-5 text-black">
                        Convert to:
                      </span>
                      <Select
                        options={BEDROCK_PROMPT_OPTONS}
                        defaultValue={selectedBedrock}
                        onChange={(value) => setSelectedBedrock(value as any)}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        styles={colourStyles}
                        placeholder="Select"
                        className="w-fit font-poppins text-base font-medium leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-full border-b border-[#D8E6FF]" />
                    <span className="font-poppins text-base font-normal leading-6 text-[#9B9B9B]">
                      OR
                    </span>
                    <div className="w-full border-b border-[#D8E6FF]" />
                  </div>
                </>
              )}

              <div>
                <div
                  {...getRootProps()}
                  className={`${
                    isDragActive ? 'bg-blue-10' : ''
                  } flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-20 p-10 py-16 transition-all hover:bg-blue-10`}
                >
                  <input {...getInputProps()} aria-label="File upload input" />
                  <div className="flex flex-col items-center justify-center gap-4">
                    <UploadIcon />
                    <p className="font-poppins text-base font-semibold leading-6 text-blackDark-100">
                      {files.length > 0
                        ? 'Add another file, or '
                        : ' Drag and drop files, or'}{' '}
                      <span className="text-blue-20">Browse</span>
                    </p>
                  </div>
                </div>
                <p className="mt-1.5 flex items-center justify-between font-poppins text-[10px] font-normal leading-3 text-[#9B9B9B]">
                  Supported formats: CSV, PDF, XLS
                  <span>Maximum size: 25MB</span>
                </p>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>
            </div>

            <div className="flex w-full items-center justify-between rounded-b-2xl bg-blue-10 p-6">
              <div className="flex items-center gap-3">
                <QuationIcon />
                <span className="font-poppins text-base font-medium leading-6 text-[#B1B1B1]">
                  Help Center
                </span>
              </div>
              {files && files.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleUploadFile()}
                  className="flex h-[50px]  w-[210px] items-center  gap-2 rounded-lg border border-blue-20 px-3 py-1.5 font-poppins text-base font-normal leading-6 text-blue-20 transition-all hover:bg-blue-20 hover:text-white"
                >
                  <span>Convert prompts</span>

                  {isLoading ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    <SendFileIcon />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploadModel;