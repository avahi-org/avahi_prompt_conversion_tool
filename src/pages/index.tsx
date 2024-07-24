/* eslint-disable new-cap */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';
import * as Yup from 'yup';

import InputChat from '@/components/InputChat';
import SpinnerLoading from '@/components/Loader/SpinnerLoading';
import PdfGenerate from '@/components/PdfGenerate';
import PriceSection from '@/components/PriceSection';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import {
  BEDROCK_PROMPT_OPTONS,
  GPT_PROMPT_OPTIONS,
  gptExamples,
  selectColourStyles,
} from '@/utils/constant';

import getGenerateClaudeAnswerData from './api/getGenerateClaudeAnswerData';
import getGenerateCostData from './api/getGenerateCostData';
import getGenerateGptData from './api/getGenerateGptData';
import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

const Select = dynamic(() => import('react-select'), { ssr: false });

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
  const [showPdfGenerator, setShowPdfGenerator] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const [, setGptCunvertedData] = useState<any>(null);
  // const [, setGptPrice] = useState<number | null>(null);
  const [, setGptTimeDisplay] = useState<any>(null);

  const [selectedGptData, setSelectedGptData] = useState<
    undefined | GptOptionDataType
  >(GPT_PROMPT_OPTIONS[0]);

  const [selectedBedrockData, setSelectedBedrockData] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const getTimeCalculation = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    // const hours = Math.floor(totalSeconds / 3600);
    // const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // return ` ${hours} hrs ${minutes} minutes ${seconds} seconds`;
    return `${seconds}`;
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

      if (result && result?.status === 200) {
        setBedrockText(selectedBedrockData?.value);
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
          setShowPdfGenerator(true);
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

      if (result && result?.status === 200) {
        const resultData = JSON.parse(result?.data?.body);
        if (resultData) {
          setGptText(selectedGptData?.value);
          setCunvertedData({
            input_token_cost: resultData?.input_token_cost,
            output_token: resultData?.output_token_cost,
          });
          setFieldValue('gptText', resultData.answer);
          setPrice(resultData?.total_average_cost);
          await handleGenerateCost();
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

  // const generatePDF = async () => {
  // setSubmitting(true);
  // try {
  //   const response = await fetch('/api/generate-pdf', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ url: window.location.href }),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to generate PDF');
  //   }

  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'Avahi.pdf';
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  //   window.URL.revokeObjectURL(url);
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   setSubmitting(false);
  // }
  // window.print();

  // const input = document.getElementById('divToPrint');
  // html2canvas(input).then((canvas) => {
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  //   pdf.addImage(imgData, 'JPEG', 0, 0);
  //   // pdf.output('dataurlnewwindow');
  //   pdf.save('download.pdf');
  // });
  // };

  const generatePDF = async () => {
    if (typeof window === 'undefined') return;
    setIsLoad(true);

    try {
      const html2pdf = await import('html2pdf.js' as any);
      const element = document.getElementById('content-to-pdf');

      const options = {
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
    <Main meta={<Meta title="AVAHI" description="AVAHI" />}>
      <form
        className=" mx-auto mt-4 flex w-full max-w-[1360px] flex-col gap-9 px-4 pb-[50px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full items-center justify-between">
          <Select
            options={gptExamples}
            components={{
              IndicatorSeparator: () => null,
            }}
            onChange={(value: any) => {
              const text = value?.value
                ?.map(
                  (item: any) =>
                    `${item?.role?.toUpperCase()}\n${item?.content}\n\n`
                )
                .join('');

              setFieldValue('typeText', text);
            }}
            styles={selectColourStyles}
            placeholder="Select GPT Example"
            className="w-56 font-poppins text-base font-medium leading-6"
          />

          {/* <span className="font-poppins text-base font-medium leading-6 text-gray-150">
            *For Demo purposes
          </span> */}
        </div>

        <div className="grid grid-cols-2  rounded-lg shadow-card">
          <InputChat
            className="rounded-l-xl bg-white pr-[64px] "
            options={GPT_PROMPT_OPTIONS}
            defaultValue={selectedGptData}
            selectChange={(value: any) => setSelectedGptData(value as any)}
            isCloseButton={!!values?.typeText}
            handleClear={() => setFieldValue('typeText', '')}
            title="OpenAI"
            textareaId="typeText"
            height="h-[100px]"
            textareaName="typeText"
            textareaOnChange={handleChange}
            textareaValue={values?.typeText}
            copyText={values?.typeText}
            textareaPlaceholder="Write your task here..."
            description="Paste the GPT prompt you want to convert below."
            isSend={true}
          />

          <InputChat
            className="rounded-r-xl  bg-blue-10/75 pl-[64px]"
            defaultValue={selectedBedrockData}
            options={BEDROCK_PROMPT_OPTONS}
            selectChange={(value) => {
              setSelectedBedrockData(value as any);
            }}
            isLikeButton={!!values?.outputText}
            textareaOnChange={handleChange}
            textareaValue={values?.outputText}
            copyText={values?.outputText}
            disabled={!values?.outputText}
            height="h-[100px]"
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
          <div className="grid grid-cols-2 rounded-lg border  border-gray-10 shadow-card">
            {values?.gptText && (
              <InputChat
                className="rounded-l-xl border-r border-gray-10 "
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
                className="rounded-r-xl "
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
          <div className="flex gap-[64px]">
            <PriceSection
              title="Input Pricing"
              price={price}
              outputPrice={bedrockPrice}
              timeDisplay={timeDisplay}
              cunvertedData={cunvertedData}
            />

            <PriceSection
              title="Output Pricing"
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

      {isSubmitting && <SpinnerLoading />}
    </Main>
  );
};

export default Home;
