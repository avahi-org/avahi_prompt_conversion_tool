import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import getGpttoClaudePromptConverterData from './api/getGpttoClaudePromptConverterData';

const Index = () => {
  const [isCopied, setIsCopied] = useState('Copy to Clipboard');

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
      if (value?.typeText) {
        setSubmitting(true);
        const result = await getGpttoClaudePromptConverterData(value?.typeText);

        if (result && result?.status === 200) {
          const resultData = JSON.parse(result?.data?.body);
          if (resultData) {
            setSubmitting(false);
            setFieldValue('outputText', resultData?.claude_prompt);
          }
        }
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
            <div className="flex flex-col items-start gap-1">
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
            <div className="flex flex-col items-start gap-1">
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
        </form>
      </div>

      {isSubmitting && (
        <div className="absolute top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
          <span className="loader"></span>
        </div>
      )}
    </Main>
  );
};

export default Index;
