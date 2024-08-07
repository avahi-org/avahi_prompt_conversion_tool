/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

type ResponseData = {
  message: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const data = new FormData();
    data.append(
      'file',
      fs.createReadStream(path.resolve('C:/Mitul/prompts-excel.xlsx'))
    );
    data.append(
      'file',
      fs.createReadStream(path.resolve('C:/Mitul/prompts-csv.csv'))
    );
    data.append('gpt_model_name', 'gpt-4-turbo');
    data.append('bedrock_model_name', 'sonnet-3.5');

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://oyiq4p7oe1.execute-api.us-east-1.amazonaws.com/PCT-upload-multiprompt-files/upload_multiprompt-file',
      headers: {
        'x-api-key': 'rA8hYHiV6o5BxrVm0n0Z91DHCHZJ7G5A6P39VJoe',
        ...data.getHeaders(),
      },
      data,
    };

    const response = await axios.request(config);

    console.log(response);

    res
      .status(200)
      .json({ message: 'File Uploaded', data: response?.data } as any);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
}
