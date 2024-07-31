import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect } from 'react';

import AvahiAiIcon from '../Icons/AvahiAiIcon';
import CloseIcon from '../Icons/CloseIcon';

type ContentAiModelProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const STANDARD_LLM_ARCHITECTURE = [
  'Random responses',
  'No trace-ability',
  'No Enterprise Access Controls',
  'Risk of information leakage',
  'Prone to hallucination',
];

const AVAHI_AI = [
  'Accurate responses',
  'Complete audit trail',
  'Full enterprise access controls',
  'No leakage of proprietary information',
  'No hallucination',
];

const ContentAiModel = ({ isOpen, setIsOpen }: ContentAiModelProps) => {
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
        <div className="fixed left-0 top-0 z-[9999]  flex h-screen w-screen items-center justify-center bg-black/5 backdrop-blur-sm">
          <div className="zoomIn max-h-[calc(100vh-30px)] w-full max-w-[800px] overflow-y-auto rounded-2xl bg-white px-5 py-8 shadow-card md:px-8">
            <div className="flex h-6 items-center justify-end">
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex w-full flex-col gap-3">
                  <h3 className="mt-6 w-full text-center font-poppins text-xl font-medium text-redLight-20">
                    Standard LLM Architecture
                  </h3>

                  <div className="flex flex-col gap-5 rounded-2xl border-2 border-redLight-10 p-8 px-4">
                    {STANDARD_LLM_ARCHITECTURE?.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center gap-4 rounded-md p-2 transition-all hover:bg-redLight-10"
                      >
                        <img
                          src="/images/sadEmoji.png"
                          alt="sadEmoji"
                          className="size-[25px]"
                        />
                        <p className="font-poppins text-sm font-medium text-black">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3">
                  <div className="flex w-full flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                      <AvahiAiIcon />
                      <h3 className="font-poppins text-xl font-medium text-blue-20">
                        Avahi AI
                      </h3>
                    </div>
                    <span className="font-poppins text-sm font-medium italic  text-gray-75">
                      Powered by AWS Bedrock
                    </span>
                  </div>

                  <div className="flex flex-col gap-5 rounded-2xl border-2 border-blue-30 px-4 py-8">
                    {AVAHI_AI?.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center gap-4 rounded-md p-2 transition-all hover:bg-[#D5F7D8]"
                      >
                        <img
                          src="/images/SmileEmoji.png"
                          alt="sadEmoji"
                          className="size-[25px]"
                        />
                        <p className="font-poppins text-sm font-medium text-black md:whitespace-nowrap">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <Link
                  href={'https://www.avahitech.com/'}
                  target="_blank"
                  className="rounded-md bg-blue-20 px-3 py-2 font-poppins text-base font-medium leading-5 text-white transition-all hover:bg-blue-50"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentAiModel;
