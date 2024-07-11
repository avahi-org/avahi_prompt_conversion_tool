import type { BedrockPromptOptionDataType } from '@/types/BedrockPromptOptionDataType';
import type { GptOptionDataType } from '@/types/GptOptionDataType';

export const GPT_PROMPT_OPTIONS: GptOptionDataType[] = [
  { id: 1, option: 'Gpt 3.5' },
  { id: 2, option: 'Gpt 4' },
  { id: 3, option: 'Gpt 4o' },
];
export const BEDROCK_PROMPT_OPTONS: BedrockPromptOptionDataType[] = [
  {
    id: 1,
    option: 'Haiku',
    inputPrice: 0.00025,
    outputPrice: 0.00125,
    value: 'haiku',
  },
  {
    id: 2,
    option: 'Sonnet',
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
