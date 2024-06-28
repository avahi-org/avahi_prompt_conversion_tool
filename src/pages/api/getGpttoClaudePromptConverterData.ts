const axios = require('axios');

const getGpttoClaudePromptConverterData = async (gpt4Text: string) => {
  const data = JSON.stringify({
    queryStringParameters: {
      query: gpt4Text,
    },
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    connection: 'keep-alive',
    host: Infinity,
    url: 'https://lih5v6xvmh.execute-api.us-east-1.amazonaws.com/gpt-to-claude-prompt-converter/convert',
    headers: {
      'x-api-key': '6oQ7blzBNH1YWJUjeuh6gFwUu73ZDQO7Oz7266Yg',
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

export default getGpttoClaudePromptConverterData;
