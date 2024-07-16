import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';

export const GPT_PROMPT_OPTIONS: GptOptionDataType[] = [
  { id: 1, value: 'gpt-3.5', label: 'Gpt 3.5' },
  { id: 2, value: 'gpt-4', label: 'Gpt 4' },
  { id: 3, value: 'gpt-4o', label: 'Gpt 4o' },
  { id: 3, value: 'gpt-4-turbo', label: 'Gpt 4 Turbo' },
];
export const BEDROCK_PROMPT_OPTONS: BedrockPromptOptionDataType[] = [
  {
    id: 1,
    label: 'Haiku',
    inputPrice: 0.00025,
    outputPrice: 0.00125,
    value: 'haiku',
  },
  {
    id: 2,
    label: 'Sonnet',
    inputPrice: 0.003,
    outputPrice: 0.015,
    value: 'sonnet',
  },
  // {
  //   id: 3,
  //   option: 'Opus - $0.075',
  //   inputPrice: 0.015,
  //   outputPrice: 0.075,
  //   value: '',
  // },
];

export const wordCounter = (paragraph: string) => {
  return paragraph.match(/\b\w+\b/g)?.length;
};

export const generateGptApiURL =
  'https://utvzkaqcm5.execute-api.us-east-1.amazonaws.com/';

export const generateClaudeAnswerApiURL =
  'https://td67y4eqeb.execute-api.us-east-1.amazonaws.com/';

export const promptConverterApiURL =
  'https://an6dzbt9u8.execute-api.us-east-1.amazonaws.com/';

export const generateCostApiURL =
  'https://2sejgh00lk.execute-api.us-east-1.amazonaws.com/';
