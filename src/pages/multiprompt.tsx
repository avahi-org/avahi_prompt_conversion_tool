/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import AWS from 'aws-sdk';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CostSavingCart from '@/components/CostSavings/CostSavingCart';
import CostTable from '@/components/CostSavings/CostTable';
import UploadFile from '@/components/CostSavings/UploadFile';
import GenerateReport from '@/components/GenerateReport';
import SpinnerLoading from '@/components/Loader/SpinnerLoading';
import FileUploadModel from '@/components/Models/FileUploadModel';
import { Meta } from '@/layouts/Meta';
import { MainLayout } from '@/templates/MainLayout';
import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';
import { BEDROCK_PROMPT_OPTONS, GPT_PROMPT_OPTIONS } from '@/utils/constant';

interface FileWithPreview extends File {
  preview: string;
}

// interface Prompt {
//   'OpenAI Prompt': string;
//   'Bedrock Prompt': string;
//   'Input Token Cost': number;
//   'Output Token Cost': number;
//   'Total Cost': number;
// }

type Prompt = {
  'OpenAI Prompt'?: string;
  'Bedrock Prompt'?: string;
  'OpenAI Input Token Cost'?: number;
  'Bedrock Input Token Cost'?: number;
  'Total Cost?': number;
  'Input Token Cost'?: number;
  'Output Token Cost'?: number;
};

const CostSavings = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [fileModelOpen, setFileModelOpen] = useState(false);
  const [isGenerateBtn] = useState<boolean>(false);
  const [isGenerateReport, setIsGenerateReport] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowOutput, setisShowOutput] = useState<boolean>(false);
  const [isFileLoading] = useState<boolean>(false);
  const [fileKeys] = useState<any>(null);
  const [multiPrompt, setMultiPrompt] = useState<Prompt[]>([]);
  const [selectedGpt, setSelectedGpt] = useState<undefined | GptOptionDataType>(
    GPT_PROMPT_OPTIONS[0]
  );

  const [selectedBedrock, setSelectedBedrock] = useState<
    BedrockPromptOptionDataType | undefined
  >(BEDROCK_PROMPT_OPTONS[0]);

  const handleMultiPrompt = async (s3_key: string) => {
    setIsLoading(true);

    if (s3_key?.length > 0) {
      try {
        const response = await fetch('/api/generateMultiPrompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            queryStringParameters: {
              s3_key,
            },
          }),
        });
        const data = await response.json();
        if (response && data?.statusCode === 200) {
          setMultiPrompt(data?.body);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fileKeys && fileKeys?.s3_key) {
      console.log('fileKeys?.s3_key', fileKeys?.s3_key);
      // handleMultiPrompt(fileKeys?.s3_key);
    }
  }, [fileKeys]);

  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = '';

    // S3 Region
    const REGION = 'us-east-1';

    // Configure AWS with access and secret keys
    AWS.config.update({
      accessKeyId: '',
      secretAccessKey: '',
    });

    // Create S3 instance
    const s3 = new AWS.S3({
      region: REGION,
    });

    // File Parameters
    if (files && files.length > 0) {
      const fileObject = files[0] as File;

      const filePathe = `input_files/${uuidv4()}/${selectedGpt?.value}-to-${
        selectedBedrock?.value
      }/${fileObject.name}`;
      console.log('filePathe', filePathe);
      const params = {
        Bucket: S3_BUCKET,
        Key: filePathe,
        Body: fileObject,
        // ACL: 'public-read', // Set ACL as needed
      };

      try {
        // Uploading file to s3
        const data = await s3
          .upload(params)
          .on('httpUploadProgress', (evt: AWS.S3.ManagedUpload.Progress) => {
            console.log('evt', evt);
            // File uploading progress
            // console.log(
            //   `Uploading ${parseInt((evt.loaded * 100) / evt.total, 10)}%`
            // );
          })
          .promise();

        // File successfully uploaded
        console.log('File uploaded successfully.', data);

        // Access the uploaded file details
        console.log('File URL:', data.Location);
        console.log('ETag:', data.ETag);
        console.log('Bucket:', data.Bucket);
        console.log('Key:', data.Key);

        // Optional: Show an alert with the file URL
        // alert(`File uploaded successfully. Access it here: ${data.Location}`);
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file.');
      }
    }
  };

  const handleUploadFile = async () => {
    // setIsFileLoading(true);
    if (files && files.length > 0) {
      uploadFile();
      // try {
      //   const formData = new FormData();
      //   files.forEach((file) => {
      //     formData.append('file', file);
      //   });
      //   formData.append('gpt_model_name', 'gpt-4-turbo');
      //   formData.append('bedrock_model_name', 'sonnet-3.5');

      //   const response = await axios.post('/api/fileUpload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      //   console.log('response', response);
      //   if (response && response?.status === 200) {
      //     setFiles([]);
      //     setIsGenerateBtn(true);
      //     setFileKeys(response?.data?.data);
      //     setFileModelOpen(false);
      //     toast.success(response?.data?.data?.message);
      //   }
      // } catch (error) {
      //   console.error('Error uploading file:', error);
      // } finally {
      //   setIsFileLoading(false);
      // }
    }
  };

  const handleGenerateOutput = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generateOutput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queryStringParameters: {
            s3_key: fileKeys?.s3_key,
          },
        }),
      });
      const data = await response.json();
      if (response && data?.statusCode === 200) {
        setMultiPrompt(data?.body);
        setisShowOutput(true);
        setIsGenerateReport(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    if (files) {
      const data = {
        'form-name': 'new-job-application',
      };
      axios
        .post('/api/generateReport', JSON?.stringify(data))
        .then((res) => {
          return res;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
    }
  };

  return (
    <MainLayout isAuth={true} meta={<Meta title="AVAHI" description="AVAHI" />}>
      <div className="flex flex-col gap-4 px-5 lg:px-12">
        <UploadFile
          handleUploadFile={() => setFileModelOpen(true)}
          isGenerateBtn={isGenerateBtn}
          handleGenerateOutput={
            handleGenerateOutput || handleMultiPrompt('sdsds')
          }
        />

        <div className="lg:px-6">
          <CostSavingCart
            className="border-b-2 border-gray-10 pb-4"
            isCostSaving={true}
          />
        </div>

        <div className="table-scrollbar relative max-h-[440px] overflow-auto px-0 pr-6 lg:px-6">
          {multiPrompt && multiPrompt?.length ? (
            <CostTable data={multiPrompt} isShowOutput={isShowOutput} />
          ) : (
            'No data'
          )}
        </div>

        {isGenerateReport && (
          <div>
            <GenerateReport handleClick={handleGenerateReport} />
          </div>
        )}
      </div>

      <FileUploadModel
        handleUploadFile={handleUploadFile}
        isOpen={fileModelOpen}
        files={files}
        setFiles={setFiles}
        setIsOpen={setFileModelOpen}
        isLoading={isFileLoading}
        setSelectedGpt={setSelectedGpt}
        selectedGpt={selectedGpt}
        selectedBedrock={selectedBedrock}
        setSelectedBedrock={setSelectedBedrock}
      />

      {isLoading && <SpinnerLoading />}
    </MainLayout>
  );
};

export default CostSavings;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = nookies.get(ctx)?.token;

  if (!accessToken) {
    return {
      redirect: {
        source: ctx.req.url,
        destination: `/login`,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
