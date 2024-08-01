/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';
import * as Yup from 'yup';

import QutionMarkIcon from '@/components/Icons/QutionMarkIcon';
import InputChat from '@/components/InputChat';
import SpinnerLoading from '@/components/Loader/SpinnerLoading';
import ContentAiModel from '@/components/Models/ContentAiModel';
import PdfGenerate from '@/components/PdfGenerate';
import PriceSection from '@/components/PriceSection';
import { Meta } from '@/layouts/Meta';
import { MainLayout } from '@/templates/MainLayout';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import {
  BEDROCK_PROMPT_OPTONS,
  GPT_PROMPT_OPTIONS,
  gptExamples,
} from '@/utils/constant';

import getGenerateClaudeAnswerData from './api/getGenerateClaudeAnswerData';
import getGenerateGptData from './api/getGenerateGptData';
import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

// const Select = dynamic(() => import('react-select'), { ssr: false });

const Home = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [cunvertedData, setCunvertedData] = useState<any>(null);
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  const [timeDisplay, setTimeDisplay] = useState<any>(null);
  const [bedrockCunvertedData, setBedrockCunvertedData] = useState<any>(null);
  const [bedrockPrice, setBedrockPrice] = useState<number | null>(null);
  const [bedrockTimeDisplay, setBedrockTimeDisplay] = useState<any>(null);
  const [gptText, setGptText] = useState('');
  const [bedrockText, setBedrockText] = useState('');
  const [selectedGptExamples, setSelectedGptExamples] = useState('');
  const [showPdfGenerator, setShowPdfGenerator] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);

  // const [, setGptCunvertedData] = useState<any>(null);
  // const [, setGptTimeDisplay] = useState<any>(null);

  const [selectedGptData, setSelectedGptData] = useState<
    undefined | GptOptionDataType
  >(GPT_PROMPT_OPTIONS[0]);

  const [selectedBedrockData, setSelectedBedrockData] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const getTimeCalculation = (milliseconds: number): string => {
    // const totalSeconds = Math.floor(milliseconds / 1000);
    const totalSeconds = milliseconds / 1000;
    const seconds = totalSeconds % 60;
    return `${seconds.toFixed(2)}`;
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
        // const tempElementText = document.createElement('div');
        // tempElementText.innerHTML = values.typeText;
        // const textContentElement =
        //   tempElementText.textContent || tempElementText.innerText;
        // const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

        const result = await getGpttoClaudePromptConverterData(
          values.typeText,
          selectedBedrockData?.value || ''
        );

        endTime = new Date().getTime();
        if (result && result?.status === 200) {
          const resultData = JSON.parse(result?.data?.body);
          if (resultData) {
            // const tempElement = document.createElement('div');
            // tempElement.innerHTML = resultData?.claude_prompt;
            // const textContent =
            //   tempElement.textContent || tempElement.innerText;

            setSubmitting(false);
            setFieldValue('outputText', resultData?.claude_prompt);

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

  const handleGenerateBedrock = async () => {
    if (values.outputText && selectedBedrockData?.value) {
      console.log('values.outputText', values.outputText);
      const startTime = new Date().getTime();
      let endTime = null;
      setSubmitting(true);
      // const tempElementText = document.createElement('div');
      // tempElementText.innerHTML = values.outputText;
      // const textContentElement =
      //   tempElementText.textContent || tempElementText.innerText;
      // const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateClaudeAnswerData(
        values.outputText,
        selectedBedrockData?.value || ''
      );

      endTime = new Date().getTime();

      if (result && result?.status === 200) {
        setBedrockText(selectedBedrockData?.value);
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          // const tempElement = document.createElement('div');
          // tempElement.innerHTML = resultData.answer;
          // const textContent = tempElement.textContent || tempElement.innerText;

          setBedrockCunvertedData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setFieldValue('bedrockOutput', resultData.answer);
          setBedrockPrice(resultData?.total_average_cost);
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setBedrockTimeDisplay(getTime);
    }
  };

  // const handleGenerateCost = async () => {
  //   if (values.typeText && selectedGptData?.value) {
  //     setSubmitting(true);
  //     const startTime = new Date().getTime();
  //     let endTime = null;

  //     const tempElementText = document.createElement('div');
  //     tempElementText.innerHTML = values.typeText;
  //     const textContentElement =
  //       tempElementText.textContent || tempElementText.innerText;
  //     const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

  //     const result = await getGenerateCostData(
  //       cleanedTextContent,
  //       selectedGptData?.value || ''
  //     );
  //     endTime = new Date().getTime();
  //     if (result) {
  //       setSubmitting(false);
  //     }
  //     if (result && result?.status === 200) {
  //       const resultData = JSON.parse(result?.data?.body);
  //       if (resultData) {
  //         setShowPdfGenerator(true);
  //         setGptTimeDisplay(resultData?.input_token_cost);
  //         setGptCunvertedData({
  //           input_token_cost: resultData?.input_token_cost,
  //         });
  //       }
  //     }
  //     const getTime = getTimeCalculation(endTime - startTime);
  //     setGptTimeDisplay(getTime);
  //   }
  // };

  const handleGenerateGpt = async () => {
    if (values.typeText && selectedGptData?.value) {
      const startTime = new Date().getTime();
      let endTime = null;
      setSubmitting(true);
      // const tempElementText = document.createElement('div');
      // tempElementText.innerHTML = values.typeText;
      // const textContentElement =
      //   tempElementText.textContent || tempElementText.innerText;
      // const cleanedTextContent = textContentElement.replace(/\n/g, '').trim();

      const result = await getGenerateGptData(
        values.typeText,
        selectedGptData?.value || ''
      );

      endTime = new Date().getTime();
      if (result) {
        setSubmitting(false);
      }

      if (result && result?.status === 200) {
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          setShowPdfGenerator(true);
          setGptText(selectedGptData?.value);
          setCunvertedData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setFieldValue('gptText', resultData.answer);
          setPrice(resultData?.total_average_cost);
          // await handleGenerateCost();
        }
      }

      const getTime = getTimeCalculation(endTime - startTime);
      setTimeDisplay(getTime);
    }
  };

  const handleGenerateOutput = () => {
    handleGenerateBedrock();
    handleGenerateGpt();
  };

  const generatePDF = async () => {
    if (typeof window === 'undefined') return;
    setIsLoad(true);

    try {
      const html2pdf = await import('html2pdf.js' as any);
      const element = document.getElementById('content-to-pdf');

      const options = {
        margin: [0.1, 0.1, 0.1, 0.1],
        filename: 'report.pdf',
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'landscape' },
      };

      html2pdf
        .default()
        .from(element)
        .set(options)
        .save()
        .then(() => {
          setIsLoad(false);
        });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [isSubmitting]);

  return (
    <MainLayout meta={<Meta title="AVAHI" description="AVAHI" />}>
      <form
        className="mx-auto flex w-full flex-col gap-9 px-5 pt-0 lg:px-9 lg:pt-6"
        onSubmit={handleSubmit}
        id="content-to-pdf"
      >
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins text-lg font-medium leading-6 text-blackDark-100 sm:text-xl">
              GPT example to convert:
            </h3>

            <button type="button" onClick={() => setModelIsOpen(true)}>
              <QutionMarkIcon />
            </button>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {gptExamples?.map(({ image, label, value }, index) => (
              <button
                type="submit"
                className={`${
                  selectedGptExamples === label
                    ? 'border-blue-20 bg-blue-30'
                    : 'border-blue-30'
                } group flex flex-col items-start gap-7 rounded-xl border  p-6 transition-all duration-300 hover:border-blue-20 hover:bg-blue-30`}
                key={index}
                onClick={async () => {
                  setSelectedGptExamples(label);
                  const text = value
                    ?.map(
                      (item: any) =>
                        `${item?.role?.toUpperCase()}\n${item?.content}\n\n`
                    )
                    .join('');

                  setFieldValue('typeText', text);
                }}
              >
                <img src={image} alt="icons" className="w-6 min-w-6" />

                <p
                  className={`${
                    selectedGptExamples === label
                      ? 'text-blue-20'
                      : 'text-blackDark-100'
                  } group-hover: text-start font-poppins text-base font-normal  tracking-[-0.5%]`}
                >
                  {label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid rounded-lg shadow-card lg:grid-cols-2">
          <InputChat
            className="rounded-t-xl bg-white lg:rounded-l-xl lg:pr-[64px] "
            options={GPT_PROMPT_OPTIONS}
            defaultValue={selectedGptData}
            selectChange={(value: any) => {
              setSelectedGptData(value as any);
              handleSubmit();
              // handleGenerateOutput();
            }}
            isCloseButton={!!values?.typeText}
            handleClear={() => setFieldValue('typeText', '')}
            title="OpenAI"
            textareaId="typeText"
            height="lg:h-[100px]"
            textareaName="typeText"
            textareaOnChange={handleChange}
            textareaValue={values?.typeText}
            copyText={values?.typeText}
            textareaPlaceholder="Write your task here..."
            description="Paste the GPT prompt you want to convert below."
            isSend={true}
            disabled={true}
          />

          <InputChat
            className="rounded-b-xl bg-blue-10/75 lg:rounded-r-xl lg:pl-[64px]"
            defaultValue={selectedBedrockData}
            options={BEDROCK_PROMPT_OPTONS}
            selectChange={(value: any) => {
              setSelectedBedrockData(value as any);
              handleSubmit();
              // handleGenerateOutput();
            }}
            isLikeButton={!!values?.outputText}
            textareaOnChange={handleChange}
            textareaValue={values?.outputText}
            copyText={values?.outputText}
            disabled={!values?.outputText}
            height="lg:h-[100px]"
            title="Bedrock"
            textareaId="outputText"
            textareaName="outputText"
            description="Below you'll see the converted prompt.  The {{ VARIABLE }} tags represent dynamic variables."
          />
        </div>

        {isShowButton && (
          <div className="flex items-center justify-center">
            <button
              className="z-30 flex items-center justify-center gap-1.5 rounded-lg border  border-gray-10 bg-blue-20  px-2 py-1.5 font-poppins text-base font-medium leading-6 text-white transition-all hover:bg-blue-50"
              type="button"
              onClick={() => handleGenerateOutput()}
            >
              <span>Generate Output</span>
              <RiAiGenerate />
            </button>
          </div>
        )}

        {(values?.bedrockOutput || values?.gptText) && !isSubmitting && (
          <div className="grid rounded-lg border border-gray-10  shadow-card lg:grid-cols-2">
            {values?.gptText && (
              <InputChat
                className="rounded-t-xl border-b border-gray-10 lg:rounded-l-xl lg:border-r"
                isText={true}
                selectedText={gptText}
                textareaOnChange={handleChange}
                textareaValue={values?.gptText}
                copyText={values?.gptText}
                title="OpenAI"
                textareaId="gptText"
                textareaName="gptText"
                description="The following text is the output of the GPT prompt."
              />
            )}

            {values?.bedrockOutput && (
              <InputChat
                className="rounded-b-xl lg:rounded-r-xl"
                isText={true}
                selectedText={bedrockText}
                textareaOnChange={handleChange}
                textareaValue={values?.bedrockOutput}
                copyText={values?.bedrockOutput}
                title="Bedrock"
                textareaId="bedrockOutput"
                textareaName="bedrockOutput"
                description="The following text is the output of the converted Bedrock prompt."
              />
            )}
          </div>
        )}

        {showPdfGenerator && (
          <PdfGenerate handleClick={generatePDF} isLoad={isLoad} />
        )}

        {(price || bedrockPrice) && !isSubmitting && (
          <div className="flex flex-col gap-7 gap-y-10 1140:flex-row 2xl:gap-16">
            <PriceSection
              title="OpenAI Pricing"
              price={price}
              outputPrice={bedrockPrice}
              timeDisplay={timeDisplay}
              cunvertedData={cunvertedData}
            />

            <PriceSection
              title="Bedrock Pricing"
              isGreenText={true}
              price={bedrockPrice}
              isShowPrPrice={true}
              inputTimeDisplay={timeDisplay}
              inputPrice={price}
              inputCunvertedData={cunvertedData}
              timeDisplay={bedrockTimeDisplay}
              cunvertedData={bedrockCunvertedData}
            />
          </div>
        )}
      </form>
      {/* <SingUpMessage /> */}
      <ContentAiModel isOpen={modelIsOpen} setIsOpen={setModelIsOpen} />

      {isSubmitting && <SpinnerLoading />}
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = nookies.get(ctx)?.token;

  if (accessToken) {
    return {
      redirect: {
        source: ctx.req.url,
        destination: `/auth`,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
