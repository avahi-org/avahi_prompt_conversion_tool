/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import React, { useState } from 'react';

import CostSavingCart from '@/components/CostSavings/CostSavingCart';
import CostTable from '@/components/CostSavings/CostTable';
import UploadFile from '@/components/CostSavings/UploadFile';
import GenerateReport from '@/components/GenerateReport';
import SpinnerLoading from '@/components/Loader/SpinnerLoading';
import FileUploadModel from '@/components/Models/FileUploadModel';
import { Meta } from '@/layouts/Meta';
import { MainLayout } from '@/templates/MainLayout';

interface FileWithPreview extends File {
  preview: string;
}

const CostSavings = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [fileModelOpen, setFileModelOpen] = useState(false);
  const [isGenerateBtn, setIsGenerateBtn] = useState<boolean>(false);
  const [isGenerateReport, setIsGenerateReport] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

  const handleUploadFile = async () => {
    setIsFileLoading(true);
    if (files) {
      const data = {
        'form-name': 'new-job-application',
        file: files,
      };
      axios
        .post('/api/fileUpload', JSON?.stringify(data))
        .then((res) => {
          return res;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsFileLoading(false);
            setIsGenerateBtn(true);
            setFileModelOpen(false);
            setFiles([]);
          }, 2000);
        });
    }
  };

  const handleGenerateOutput = async () => {
    setIsLoading(true);
    if (files) {
      const data = {
        'form-name': 'new-job-application',
      };
      axios
        .post('/api/generateOutput', JSON?.stringify(data))
        .then((res) => {
          setIsGenerateReport(true);

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
      <div className="flex flex-col gap-4 px-12">
        <UploadFile
          handleUploadFile={() => setFileModelOpen(true)}
          isGenerateBtn={isGenerateBtn}
          handleGenerateOutput={handleGenerateOutput}
        />

        <div className="px-6">
          <CostSavingCart
            className="border-b-2 border-gray-10 pb-4"
            isCostSaving={true}
          />
        </div>

        <div className="table-scrollbar min-[1490px] relative max-h-[440px] overflow-hidden overflow-y-auto px-6">
          {/* <CostNoDataTable /> */}
          <CostTable />
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
