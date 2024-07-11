import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import DropDownIcon from '@/components/Icons/DropDownIcon';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import { BEDROCK_PROMPT_OPTONS, GPT_PROMPT_OPTIONS } from '@/utils/constant';

import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

const Index = () => {
  const [isCopied, setIsCopied] = useState('Copy to Clipboard');
  const [isOpenGptDropDown, setIsOpenGptDropDown] = useState<boolean>(false);
  const [isOpenBedrockDropDown, setIsOpenBedrockDropDown] =
    useState<boolean>(false);
  const [selectedGptData, setSelectedGptData] = useState<
    GptOptionDataType | undefined
  >(GPT_PROMPT_OPTIONS[0]);
  const [selectedBedrockData, setSelectedBedrockData] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);
  const [price, setPrice] = useState<any>(null);
  const [timeDisplay, setTimeDisplay] = useState<any>(null);

  const getTimeCalculation = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return ` ${hours} hrs ${minutes} minutes ${seconds} seconds`;
  };

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      typeText: '',
      outputText: '',
    },
    validationSchema: Yup.object().shape({
      typeText: Yup.string().required(''),
    }),
    onSubmit: async (value) => {
      if (value?.typeText && selectedBedrockData?.value) {
        const startTime = new Date().getTime();
        let endTime = null;
        setSubmitting(true);
        const result = await getGpttoClaudePromptConverterData(
          value?.typeText,
          selectedBedrockData?.value || ''
        );
        endTime = new Date().getTime();
        if (result && result?.status === 200) {
          const resultData = JSON.parse(result?.data?.body);
          if (resultData) {
            setSubmitting(false);
            setFieldValue('outputText', resultData?.claude_prompt);
            setPrice(resultData?.average_cost);
          }
        }

        const getTime = getTimeCalculation(endTime - startTime);
        setTimeDisplay(getTime);
      }
    },
  });
  useEffect(() => {
    if (isSubmitting) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [isSubmitting]);

  const handleGptDropDown = () => {
    setIsOpenGptDropDown(!isOpenGptDropDown);
  };

  const handleBedrockDropDown = () => {
    setIsOpenBedrockDropDown(!isOpenBedrockDropDown);
  };

  // const calculatePrice = (wordCount) => {
  //   if (selectedBedrockData && wordCount > 0) {
  //     const totalPrice =
  //       (wordCount * 1.3 * selectedBedrockData.outputPrice) / 100;

  //     setPrice(totalPrice.toFixed(8));
  //   }
  // };

  // useEffect(() => {
  //   if (values.outputText) {
  //     const wordCount = wordCounter(values?.outputText);
  //     setOutputWordCount(wordCount);
  //     calculatePrice(wordCount);
  //   }
  // }, [values.outputText, selectedBedrockData]);

  return (
    <Main meta={<Meta title="Home" description="Home" />}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-16 px-4 pt-10">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4">
          <h1 className="text-[28px] font-normal leading-[60px] text-black">
            Avahi prompt converter: GPT to bedrock
          </h1>
          <p className="text-center text-base text-black">
            This tool uses the best prompt engineering practices and converts
            GPT prompt to Bedrock prompt.
          </p>
        </div>
        <form className="grid grid-cols-2 gap-[75px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col items-start gap-1">
              <div
                onClick={() => {
                  handleGptDropDown();
                }}
                className="flex w-2/3 cursor-pointer items-center justify-between rounded-md border-2 p-2"
              >
                <p className="select-none text-lg">{selectedGptData?.option}</p>
                <div
                  className={`${
                    isOpenGptDropDown
                      ? 'rotate-180 duration-500'
                      : 'rotate-0 duration-500'
                  }`}
                >
                  <DropDownIcon />
                </div>
                {isOpenGptDropDown && (
                  <div className="absolute left-0 top-14 flex w-2/3 rounded-md border bg-white shadow-md">
                    <ul className="w-full p-1">
                      {GPT_PROMPT_OPTIONS &&
                        GPT_PROMPT_OPTIONS.length &&
                        GPT_PROMPT_OPTIONS.map((value) => {
                          return (
                            <li
                              key={value.id}
                              onClick={() => {
                                setSelectedGptData(value);
                              }}
                              className="flex w-full cursor-pointer select-none items-center border-b p-2 text-lg"
                            >
                              {value.option}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
              <h2 className="text-lg font-semibold text-primary">GPT Prompt</h2>
              <h2 className="text-xs font-normal text-black">
                Paste your GPT prompt below.
              </h2>
            </div>
            <textarea
              className="z-2 overflow-wrap break-word  h-[398px] max-h-[300px] min-h-[400px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none transition-all hover:border-primary"
              placeholder="Write your task here..."
              data-gramm_editor="false"
              id="typeText"
              name="typeText"
              onChange={handleChange}
              value={values?.typeText}
            />
            <button
              className="mx-auto w-[160px] rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
              type="submit"
            >
              Convert Prompt
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col items-start gap-1">
              <div
                onClick={() => {
                  handleBedrockDropDown();
                }}
                className="flex w-2/3 cursor-pointer items-center justify-between rounded-md border-2 p-2"
              >
                <p className="select-none text-lg">
                  {selectedBedrockData?.option}
                </p>
                <div
                  className={`${
                    isOpenBedrockDropDown
                      ? 'rotate-180 duration-500'
                      : 'rotate-0 duration-500'
                  }`}
                >
                  <DropDownIcon />
                </div>

                {isOpenBedrockDropDown && (
                  <div className="absolute left-0 top-14 flex w-2/3 rounded-md border bg-white shadow-md">
                    <ul className="w-full p-1">
                      {BEDROCK_PROMPT_OPTONS &&
                        BEDROCK_PROMPT_OPTONS.length &&
                        BEDROCK_PROMPT_OPTONS.map((value) => {
                          return (
                            <li
                              key={value.id}
                              onClick={() => {
                                setSelectedBedrockData(value);
                              }}
                              className="flex w-full cursor-pointer select-none items-center border-b p-2 text-lg"
                            >
                              {value.option}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold text-secondary">
                Bedrock Prompt
              </h2>
              <h2 className="text-xs font-normal text-black">
                Below you&apos;ll see the prompt. The{' '}
                <span className="font-bold">{'{{ VARIABLE }}'}</span> tags
                represent dynamic variables.
              </h2>
            </div>
            <pre
              className="z-2 overflow-wrap break-word h-[398px] max-h-[300px] min-h-[400px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none transition-all hover:border-primary"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {values?.outputText}
            </pre>
            <div className="flex items-center justify-between">
              <div className="flex w-1/2 justify-end">
                <button
                  className="mx-auto w-[160px] rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
                  type="button"
                >
                  Generate Output
                </button>
              </div>

              <button
                className="ml-auto rounded-md border bg-transparent px-4 py-2 pb-2.5 text-xs leading-3 text-black outline-none "
                type="button"
                onClick={() => {
                  if (values?.outputText) {
                    navigator.clipboard.writeText(values.outputText);
                    setIsCopied('Copied!');
                    setTimeout(() => {
                      setIsCopied('Copy to Clipboard');
                    }, 1000);
                  }
                }}
              >
                {isCopied}
              </button>
            </div>
          </div>
        </form>
      </div>

      {price && (
        <div className="mx-auto mt-3 flex max-w-[700px] flex-col items-center gap-4">
          <h1 className="text-[28px] font-normal leading-[60px] text-black">
            Total Price ${price}
          </h1>
          {timeDisplay && (
            <p className="text-center text-base text-black">
              Total time taken {timeDisplay}
            </p>
          )}
        </div>
      )}

      {isSubmitting && (
        <div className="absolute top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
          <span className="loader"></span>
        </div>
      )}
    </Main>
  );
};
export default Index;
