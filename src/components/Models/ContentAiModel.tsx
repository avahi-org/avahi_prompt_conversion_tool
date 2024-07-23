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
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/5 backdrop-blur-sm">
          <div className="w-full max-w-[800px] rounded-2xl bg-white p-8 shadow-card">
            <div className="flex h-6 items-center justify-end">
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-8">
                <div className="flex w-full flex-col gap-3">
                  <h3 className="w-full text-center font-poppins text-xl font-medium text-redLight-20">
                    Standard LLM Architecture
                  </h3>

                  <div className="flex flex-col gap-5 rounded-2xl border-2 border-redLight-20 px-4 py-8">
                    {STANDARD_LLM_ARCHITECTURE?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 py-2">
                        <img
                          src="/images/sadEmoji.png"
                          alt="sadEmoji"
                          className="size-5"
                        />
                        <p className="font-poppins text-sm font-medium text-black">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="flex w-full items-center justify-center gap-2">
                    <AvahiAiIcon />
                    <h3 className="font-poppins text-xl font-medium text-blue-20">
                      Avahi AI
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5 rounded-2xl border-2 border-blue-30 px-4 py-8">
                    {AVAHI_AI?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 py-2">
                        <img
                          src="/images/SmileEmoji.png"
                          alt="sadEmoji"
                          className="size-5"
                        />
                        <p className="font-poppins text-sm font-medium text-black">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <button className="rounded-md bg-blue-20 px-3 py-2 font-poppins text-base font-medium leading-5 text-white">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentAiModel;
