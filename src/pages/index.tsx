/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { useFormik } from 'formik';
// import Select from 'react-select';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import CloseIcon from '@/components/Icons/CloseIcon';
import TrueIcon from '@/components/Icons/TrueIcon';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import { BEDROCK_PROMPT_OPTONS, GPT_PROMPT_OPTIONS } from '@/utils/constant';

import getGenerateClaudeAnswerData from './api/getGenerateClaudeAnswerData';
import getGenerateCostData from './api/getGenerateCostData';
import getGenerateGptData from './api/getGenerateGptData';
import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

const Select = dynamic(() => import('react-select'), { ssr: false });

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

const Index = () => {
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: 'white',
      borderColor: 'gray',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'darkgray',
      },
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected
        ? '#4E54FC'
        : isFocused
        ? 'lightgray'
        : undefined,
      color: isSelected ? 'white' : 'black',
      '&:active': {
        backgroundColor: '#4E54FC',
        color: 'white',
      },
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'black',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'gray',
    }),
  };

  const [isCopied, setIsCopied] = useState('Copy to Clipboard');
  const [isAnswerCopied, setIsAnswerCopied] = useState('Copy to Clipboard');
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  const [inputTokenCost, setInputTokenCost] = useState('');
  console.log('inputTokenCost', inputTokenCost);

  const [selectedGptData, setSelectedGptData] = useState<
    undefined | GptOptionDataType
  >(GPT_PROMPT_OPTIONS[0]);

  const [selectedBedrockData, setSelectedBedrockData] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const [price, setPrice] = useState<any>(null);
  const [timeDisplay, setTimeDisplay] = useState<any>(null);
  const [generatedPrice, setGeneratedPrice] = useState<any>(null);
  const [generatedTimeDisplay, setGeneratedTimeDisplay] = useState<any>(null);
  const [answer, setAnswer] = useState<any>(null);
  const [cunvertedData, setCunvertedData] = useState<any>(null);
  const [answerData, setAnswerData] = useState<any>(null);

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
        const tempElementText = document.createElement('div');
        tempElementText.innerHTML = values.typeText;
        const textContentElement =
          tempElementText.textContent || tempElementText.innerText;
        const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

        const result = await getGpttoClaudePromptConverterData(
          cleanedTextContent,
          selectedBedrockData?.value || ''
        );

        endTime = new Date().getTime();
        if (result && result?.status === 200) {
          const resultData = JSON.parse(result?.data?.body);
          if (resultData) {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = resultData?.claude_prompt;
            const textContent =
              tempElement.textContent || tempElement.innerText;

            setSubmitting(false);
            setFieldValue('outputText', textContent);
            setPrice(resultData?.total_average_cost);
            setCunvertedData({
              input_token_cost: resultData?.input_token_cost,
              output_token: resultData?.output_token_cost,
            });
            setIsShowButton(true);
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

  // const handleGptDropDown = () => {
  //   setIsOpenGptDropDown(!isOpenGptDropDown);
  // };

  // const handleBedrockDropDown = () => {
  //   setIsOpenBedrockDropDown(!isOpenBedrockDropDown);
  // };

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

  const handleGenerateBedrock = async () => {
    if (values.outputText && selectedBedrockData?.value) {
      const startTime = new Date().getTime();
      let endTime = null;
      setSubmitting(true);
      const tempElementText = document.createElement('div');
      tempElementText.innerHTML = values.outputText;
      const textContentElement =
        tempElementText.textContent || tempElementText.innerText;
      const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateClaudeAnswerData(
        cleanedTextContent,
        selectedBedrockData?.value || ''
      );

      endTime = new Date().getTime();
      if (result) {
        setSubmitting(false);
      }
      if (result && result?.status === 200) {
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          setAnswerData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          const tempElement = document.createElement('div');
          tempElement.innerHTML = resultData.answer;
          const textContent = tempElement.textContent || tempElement.innerText;
          setAnswer(textContent);
          setGeneratedPrice(resultData?.total_average_cost);
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setGeneratedTimeDisplay(getTime);
    }
  };

  const handleGenerateCost = async () => {
    if (values.typeText && selectedGptData?.value) {
      setSubmitting(true);
      const tempElementText = document.createElement('div');
      tempElementText.innerHTML = values.typeText;
      const textContentElement =
        tempElementText.textContent || tempElementText.innerText;
      const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateCostData(
        cleanedTextContent,
        selectedGptData?.value || ''
      );

      if (result) {
        setSubmitting(false);
      }
      if (result && result?.status === 200) {
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          setInputTokenCost(resultData?.input_token_cost);
          setAnswerData({
            input_token_cost: resultData?.input_token_cost,
          });
        }
      }
    }
  };

  const handleGenerateGpt = async () => {
    if (values.typeText && selectedGptData?.value) {
      const startTime = new Date().getTime();
      let endTime = null;
      setSubmitting(true);
      const tempElementText = document.createElement('div');
      tempElementText.innerHTML = values.typeText;
      const textContentElement =
        tempElementText.textContent || tempElementText.innerText;
      const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateGptData(
        cleanedTextContent,
        selectedGptData?.value || ''
      );

      endTime = new Date().getTime();
      if (result) {
        setSubmitting(false);
      }
      if (result && result?.status === 200) {
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          setAnswerData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setAnswer(resultData.answer);
          setGeneratedPrice(resultData?.total_average_cost);
          await handleGenerateCost();
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setGeneratedTimeDisplay(getTime);
    }
  };

  return (
    <Main meta={<Meta title="Home" description="Home" />}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-16 px-4 pb-12 pt-10">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4">
          <h1 className="text-[28px] font-normal leading-[60px] text-black">
            Avahi prompt converter: GPT to bedrock
          </h1>
          <p className="text-center text-base text-black">
            This tool uses the best prompt engineering practices and converts
            GPT prompt to Bedrock prompt.
          </p>
        </div>
        <form
          className="grid grid-cols-2 gap-x-[75px] gap-y-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col items-start gap-1">
              <Select
                defaultValue={selectedGptData}
                onChange={(value) => setSelectedGptData(value as any)}
                options={GPT_PROMPT_OPTIONS}
                className="w-full hover:border-primary"
                styles={colourStyles}
                id="test1"
              />
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
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col items-start gap-1">
              <Select
                defaultValue={selectedBedrockData}
                onChange={(value) => {
                  setSelectedBedrockData(value as any);
                }}
                options={BEDROCK_PROMPT_OPTONS}
                id="test"
                className="w-full hover:border-primary"
                styles={colourStyles}
              />

              <h2 className="text-lg font-semibold text-secondary">
                Bedrock Prompt
              </h2>
              <h2 className="text-xs font-normal text-black">
                Below you&apos;ll see the prompt. The{' '}
                <span className="font-bold">{'{{ VARIABLE }}'}</span> tags
                represent dynamic variables.
              </h2>
            </div>

            <textarea
              className="z-2 overflow-wrap break-word  h-[398px] max-h-[300px] min-h-[400px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none transition-all hover:border-primary"
              placeholder="Write your task here..."
              data-gramm_editor="false"
              style={{ whiteSpace: 'pre-wrap' }}
              id="outputText"
              name="outputText"
              onChange={handleChange}
              value={values?.outputText}
            />

            <div className="flex items-center justify-between">
              <button
                className="z-30 ml-auto rounded-md border bg-transparent px-4 py-2 pb-2.5 text-xs leading-3 text-black outline-none "
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

          <div className="col-span-2 -mt-6 flex flex-col items-center justify-center pb-9">
            <button
              className="mx-auto mb-2 w-[160px] max-w-full rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
              type="submit"
            >
              Convert Prompt
            </button>

            {price && (
              <div className="mx-auto mt-3 flex max-w-[700px] flex-col items-start gap-4">
                <h1 className="text-[28px] font-normal text-black">
                  Total Price ${price}
                </h1>
                {cunvertedData?.input_token_cost && (
                  <p className="w-full text-base text-black">
                    <span className="font-bold">Input token cost</span> $
                    {cunvertedData?.input_token_cost}
                  </p>
                )}
                {cunvertedData?.output_token && (
                  <p className="w-full text-base text-black">
                    <span className="font-bold">Output token cost</span> $
                    {cunvertedData?.output_token}
                  </p>
                )}
                {timeDisplay && (
                  <p className="w-full text-base text-black">
                    <span className="font-bold"> Total time taken</span>{' '}
                    {timeDisplay}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={() => handleGenerateCost()}
              className="mx-auto mt-5 hidden w-[160px] rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
              type="button"
            >
              Generate Cost
            </button>

            {isShowButton && (
              <div className="flex w-full justify-center gap-x-[75px]">
                <button
                  onClick={() => handleGenerateGpt()}
                  className="mx-auto  mt-5 w-[160px]  rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
                  type="button"
                >
                  Generate GPT
                </button>

                <button
                  onClick={() => handleGenerateBedrock()}
                  className="mx-auto  mt-5 w-[170px]  max-w-full rounded-full bg-primary px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
                  type="button"
                >
                  Generate Bedrock
                </button>
              </div>
            )}
          </div>

          {answer && (
            <div className="col-span-2 flex flex-col gap-3">
              <textarea
                className="z-2 overflow-wrap break-word h-[300px] max-h-[300px] min-h-[300px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none "
                placeholder="Write your task here..."
                data-gramm_editor="false"
                value={answer}
                disabled
              />

              <button
                className="z-30 ml-auto rounded-md border bg-transparent px-4 py-2 pb-2.5 text-xs leading-3 text-black outline-none "
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
              </button>

              {generatedPrice && (
                <div className="mx-auto mt-3 flex max-w-[700px] flex-col items-start gap-4">
                  <h1 className="text-[28px] font-normal text-black">
                    Total Price ${generatedPrice}
                  </h1>
                  {answerData?.input_token_cost && (
                    <p className="w-full text-base text-black">
                      <span className="font-bold">Input token cost</span> $
                      {answerData?.input_token_cost}
                    </p>
                  )}
                  {answerData?.output_token && (
                    <p className="w-full text-base text-black">
                      <span className="font-bold">Output token cost</span> $
                      {answerData?.output_token}
                    </p>
                  )}
                  {generatedTimeDisplay && (
                    <p className="w-full text-base text-black">
                      <span className="font-bold"> Total time taken</span>{' '}
                      {generatedTimeDisplay}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </form>

        <div className="grid w-full grid-cols-2 gap-x-[75px] ">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-semibold text-[#EC6837]">
              Standard LLM Architecture
            </h3>
            {STANDARD_LLM_ARCHITECTURE?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CloseIcon />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-semibold text-[#EC6837]">
                Avahi AI
              </h3>
              {AVAHI_AI?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TrueIcon />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isSubmitting && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
          <span className="loader" />
        </div>
      )}
    </Main>
  );
};
export default Index;
