import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface QueryStringParameters {
  s3_key: string;
}

interface RequestBody {
  queryStringParameters: QueryStringParameters;
}

interface ApiResponse {
  data: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { queryStringParameters }: RequestBody = req.body;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://cdgjdrqm6k.execute-api.us-east-1.amazonaws.com/fetch-multiprompt-converted-file/fetch-multiprompt-converted-file',
      headers: {
        'x-api-key': 'rA8hYHiV6o5BxrVm0n0Z91DHCHZJ7G5A6P39VJoe',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ queryStringParameters }),
    };

    const response = await axios.request<ApiResponse>(config);

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ message: 'Internal Server Error' });
  }
}
