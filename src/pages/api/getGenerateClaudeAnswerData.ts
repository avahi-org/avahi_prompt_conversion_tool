import { generateClaudeAnswerApiURL } from '@/utils/constant';

const axios = require('axios');

const getGenerateClaudeAnswerData = async (
  gpt4Text: string,
  model_name: string
) => {
  let data = null;

  if (model_name === 'sonnet') {
    const bodysonnet = {
      queryStringParameters: {
        query: gpt4Text,
        model_names: model_name,
      },
    };
    data = JSON.stringify(bodysonnet);
  } else {
    const body = {
      queryStringParameters: {
        query: gpt4Text,
        model_name,
      },
    };
    data = JSON.stringify(body);
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    connection: 'keep-alive',
    host: Infinity,
    url: `${generateClaudeAnswerApiURL}generate_claude_answer/generate_answer`,
    headers: {
      'x-api-key': 'rA8hYHiV6o5BxrVm0n0Z91DHCHZJ7G5A6P39VJoe',
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios
    .request(config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      return error;
    });
};

export default getGenerateClaudeAnswerData;
