import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

type TabsProps = {
  totalTabs: {
    id: number;
    name: string;
    value: string;
  }[];
  activeTab: string | null;
  handleClick: (e: any) => void;
  answer: any;
  generatedPrice: any;
  answerData: any;
  generatedTimeDisplay: any;
};

const Tabs = ({
  totalTabs,
  handleClick,
  activeTab,
  answer,
  generatedPrice,
  answerData,
  generatedTimeDisplay,
}: TabsProps) => {
  const [isAnswerCopied, setIsAnswerCopied] = useState('Copy to Clipboard');

  return (
    <div className="mt-10 flex w-full flex-col gap-4">
      <div className="flex w-full  gap-10 border-b border-gray-300 px-5">
        {totalTabs?.map(({ id, name, value }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(value)}
            className={`${
              activeTab === value
                ? '!border-primary !text-primary'
                : 'border-transparent text-black'
            } -mb-px w-fit cursor-pointer border-b-2  px-3 pb-3 text-center text-base font-medium leading-[18.5px] `}
          >
            {name}
          </button>
        ))}
      </div>

      {answer && (
        <div className="col-span-2 flex flex-col gap-3">
          <textarea
            className="scrollbar-custom z-2 overflow-wrap break-word h-[300px] max-h-[300px] min-h-[300px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none "
            placeholder="Write your task here..."
            data-gramm_editor="false"
            value={answer}
            disabled
          />

          <button
            className="z-30 ml-auto flex items-center gap-2 rounded-full border bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 pb-2.5 text-xs leading-3 text-white outline-none "
            type="button"
            onClick={() => {
              const tempElement = document.createElement('div');
              tempElement.innerHTML = answer;
              const textContent =
                tempElement.textContent || tempElement.innerText;

              if (textContent) {
                navigator.clipboard.writeText(textContent);
                setIsAnswerCopied('Copied!');
                setTimeout(() => {
                  setIsAnswerCopied('Copy to Clipboard');
                }, 1000);
              }
            }}
          >
            {isAnswerCopied}
            <FaCopy />
          </button>

          {generatedPrice && (
            // <div className="mx-auto mt-3 flex max-w-[700px] flex-col items-start gap-4">
            //   <h1 className="text-[28px] font-normal text-black">
            //     Total Price ${generatedPrice}
            //   </h1>
            //   {answerData?.input_token_cost && (
            //     <p className="w-full text-base text-black">
            //       <span className="font-bold">Input token cost</span> $
            //       {answerData?.input_token_cost}
            //     </p>
            //   )}
            //   {answerData?.output_token && (
            //     <p className="w-full text-base text-black">
            //       <span className="font-bold">Output token cost</span> $
            //       {answerData?.output_token}
            //     </p>
            //   )}
            //   {generatedTimeDisplay && (
            //     <p className="w-full text-base text-black">
            //       <span className="font-bold"> Total time taken</span>{' '}
            //       {generatedTimeDisplay}
            //     </p>
            //   )}
            // </div>

            <div className="mt-6 rounded-lg  bg-white p-7 shadow-md">
              <h3 className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-center text-2xl font-bold text-transparent">
                Bedrock Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Price
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${generatedPrice}
                  </p>
                </div>
                {generatedTimeDisplay && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Time Taken
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {generatedTimeDisplay}
                    </p>
                  </div>
                )}
                {answerData?.input_token_cost && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Input Token Cost
                    </p>
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                      ${answerData?.input_token_cost}
                    </p>
                  </div>
                )}
                {answerData?.output_token && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Output Token Cost
                    </p>
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                      ${answerData?.output_token}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;
