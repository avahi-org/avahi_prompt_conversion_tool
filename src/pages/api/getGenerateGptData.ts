const axios = require('axios');

const getGenerateGptData = async (gpt4Text: string, model_name: string) => {
  const data = JSON.stringify({
    queryStringParameters: {
      query: gpt4Text,
      model_name,
    },
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    connection: 'keep-alive',
    host: Infinity,
    url: `${process.env.NEXT_PUBLIC_GENERATE_GPT}generate_gpt_answer/generate_answer_using_gpt`,
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

export default getGenerateGptData;
