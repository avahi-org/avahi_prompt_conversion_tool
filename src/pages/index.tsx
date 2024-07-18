import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { RiAiGenerate } from 'react-icons/ri';
import * as Yup from 'yup';

import BottomContent from '@/components/BottomContent';
import CopyTextButton from '@/components/Button/CopyTextButton';
import SpinnerLoading from '@/components/Loader/SpinnerLoading';
import PriceCard from '@/components/PriceCard';
import Textarea from '@/components/Textarea';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import {
  BEDROCK_PROMPT_OPTONS,
  colourStyles,
  GPT_PROMPT_OPTIONS,
  gptExamples,
} from '@/utils/constant';

import getGenerateClaudeAnswerData from './api/getGenerateClaudeAnswerData';
import getGenerateCostData from './api/getGenerateCostData';
import getGenerateGptData from './api/getGenerateGptData';
import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

const Select = dynamic(() => import('react-select'), { ssr: false });

const Index = () => {
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  // const [inputTokenCost, setInputTokenCost] = useState('');
  // console.log('inputTokenCost', inputTokenCost);

  const [selectedGptData, setSelectedGptData] = useState<
    undefined | GptOptionDataType
  >(GPT_PROMPT_OPTIONS[0]);

  const [selectedBedrockData, setSelectedBedrockData] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const [price, setPrice] = useState<number | null>(null);
  const [timeDisplay, setTimeDisplay] = useState<any>(null);

  const [cunvertedData, setCunvertedData] = useState<any>(null);
  const [bedrockCunvertedData, setBedrockCunvertedData] = useState<any>(null);

  const [bedrockPrice, setBedrockPrice] = useState<number | null>(null);
  const [bedrockTimeDisplay, setBedrockTimeDisplay] = useState<any>(null);
  const [, setGptCunvertedData] = useState<any>(null);
  const [, setGptPrice] = useState<number | null>(null);
  const [, setGptTimeDisplay] = useState<any>(null);

  const getTimeCalculation = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    // const hours = Math.floor(totalSeconds / 3600);
    // const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // return ` ${hours} hrs ${minutes} minutes ${seconds} seconds`;
    return `${seconds} seconds`;
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
      bedrockOutput: '',
      gptText: '',
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
    if (values.outputText && selectedBedrockData) {
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
          const tempElement = document.createElement('div');
          tempElement.innerHTML = resultData.answer;
          const textContent = tempElement.textContent || tempElement.innerText;

          setBedrockCunvertedData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setFieldValue('bedrockOutput', textContent);
          setBedrockPrice(resultData?.total_average_cost);
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setBedrockTimeDisplay(getTime);
    }
  };

  const handleGenerateCost = async () => {
    if (values.typeText && selectedGptData?.value) {
      setSubmitting(true);
      const startTime = new Date().getTime();
      let endTime = null;

      const tempElementText = document.createElement('div');
      tempElementText.innerHTML = values.typeText;
      const textContentElement =
        tempElementText.textContent || tempElementText.innerText;
      const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateCostData(
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
          setGptTimeDisplay(resultData?.input_token_cost);
          setGptCunvertedData({
            input_token_cost: resultData?.input_token_cost,
          });
        }
      }
      const getTime = getTimeCalculation(endTime - startTime);
      setGptTimeDisplay(getTime);
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
          setGptCunvertedData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setFieldValue('gptText', resultData.answer);
          setGptPrice(resultData?.total_average_cost);
          await handleGenerateCost();
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setGptTimeDisplay(getTime);
    }
  };

  const handleGenerateOutput = () => {
    handleGenerateBedrock();
    handleGenerateGpt();
  };

  return (
    <Main meta={<Meta title="Home" description="Home" />}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-4 pb-12 pt-10">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4">
          <h1 className="text-center text-[28px] font-normal leading-[60px] text-black">
            Avahi prompt converter: GPT to bedrock
          </h1>
          <p className="text-center text-base text-black">
            This tool uses the best prompt engineering practices and converts
            GPT prompt to Bedrock prompt.
          </p>
        </div>

        <form
          className="grid grid-cols-2 gap-x-[75px] gap-y-5"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2 flex flex-col gap-1 lg:col-span-1">
            <label htmlFor="" className="text-lg font-semibold">
              Select GPT Example
            </label>
            <Select
              onChange={(value: any) => {
                const text = value?.value
                  ?.map(
                    (item: any) =>
                      `${item?.role?.toUpperCase()}\n${item?.content}\n\n`
                  )
                  .join('');

                setFieldValue('typeText', text);
              }}
              options={gptExamples}
              className="w-full hover:border-primary"
              styles={colourStyles}
              id="selectedText"
              placeholder="Select GPT Example"
            />
          </div>
          <div className="hidden lg:block" />

          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="relative flex flex-col items-start gap-1">
              <Select
                defaultValue={selectedGptData}
                onChange={(value) => setSelectedGptData(value as any)}
                options={GPT_PROMPT_OPTIONS}
                className="w-full hover:border-primary"
                styles={colourStyles}
                id="selectedGptData"
                placeholder="select option selected"
              />
              <h2 className="text-lg font-semibold text-primary">GPT Prompt</h2>
              <h2 className="text-xs font-normal text-black">
                Paste your GPT prompt below.
              </h2>
            </div>

            <Textarea
              id="typeText"
              name="typeText"
              placeholder="Write your task here..."
              onChange={handleChange}
              value={values?.typeText}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
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

            <Textarea
              id="outputText"
              name="outputText"
              onChange={handleChange}
              value={values?.outputText}
              placeholder="Write your task here..."
            />

            <CopyTextButton textValue={values.outputText} />
          </div>

          <div className="col-span-2 flex items-center justify-center gap-2 pb-9">
            <button
              className={`${
                isShowButton ? ' ml-auto' : 'mx-auto'
              } mb-2 flex w-[190px] max-w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700`}
              type="submit"
            >
              <FaExchangeAlt /> Convert Prompt
            </button>

            {isShowButton && (
              <button
                className="mb-2 mr-auto flex w-[190px] max-w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 pb-2.5 text-[15px] leading-5 text-white outline-none hover:bg-blue-700"
                type="button"
                onClick={() => handleGenerateOutput()}
              >
                <RiAiGenerate /> Generate Output
              </button>
            )}
          </div>

          {values?.gptText && (
            <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
              <Textarea
                id="gptText"
                name="gptText"
                placeholder="Write your task here..."
                onChange={handleChange}
                value={values?.gptText}
                disabled={true}
              />
              <CopyTextButton textValue={values.gptText} />
            </div>
          )}

          {values?.bedrockOutput && (
            <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
              <Textarea
                id="bedrockOutput"
                name="bedrockOutput"
                placeholder="Write your task here..."
                onChange={handleChange}
                value={values?.bedrockOutput}
                disabled={true}
              />
              <CopyTextButton textValue={values.bedrockOutput} />
            </div>
          )}

          <PriceCard
            title="Input Price Details"
            price={price}
            timeDisplay={timeDisplay}
            cunvertedData={cunvertedData}
          />

          <PriceCard
            title="Output Price Details"
            price={bedrockPrice}
            timeDisplay={bedrockTimeDisplay}
            cunvertedData={bedrockCunvertedData}
          />

          {/* <PriceCard
            title="Input Details"
            price={gptPrice}
            timeDisplay={gptTimeDisplay}
            cunvertedData={gptCunvertedData}
          /> */}
        </form>

        <BottomContent />
      </div>

      {isSubmitting && <SpinnerLoading />}
    </Main>
  );
};
export default Index;
