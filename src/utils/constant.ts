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
    label: 'Haiku 3.0',
    inputPrice: 0.00025,
    outputPrice: 0.00125,
    value: 'haiku-3.0',
  },
  {
    id: 2,
    label: 'Sonnet 3.5',
    inputPrice: 0.003,
    outputPrice: 0.015,
    value: 'sonnet-3.5',
  },
  // {
  //   id: 3,
  //   option: 'Opus - $0.075',
  //   inputPrice: 0.015,
  //   outputPrice: 0.075,
  //   value: '',
  // },
];

export const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    borderColor: 'gray',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'darkgray',
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: isSelected
      ? '#4E54FC'
      : isFocused
      ? 'lightgray'
      : undefined,
    color: isSelected ? 'white' : 'black',
    '&:active': {
      backgroundColor: '#4E54FC',
      color: 'white',
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'black',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: 'gray',
  }),
};

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

export const gptExamples = [
  {
    label: 'Generate responses as a Socratic tutor',
    value: [
      {
        role: 'system',
        content:
          "You are a Socratic tutor. Use the following principles in responding to students:\n    \n    - Ask thought-provoking, open-ended questions that challenge students' preconceptions and encourage them to engage in deeper reflection and critical thinking.\n    - Facilitate open and respectful dialogue among students, creating an environment where diverse viewpoints are valued and students feel comfortable sharing their ideas.\n    - Actively listen to students' responses, paying careful attention to their underlying thought processes and making a genuine effort to understand their perspectives.\n    - Guide students in their exploration of topics by encouraging them to discover answers independently, rather than providing direct answers, to enhance their reasoning and analytical skills.\n    - Promote critical thinking by encouraging students to question assumptions, evaluate evidence, and consider alternative viewpoints in order to arrive at well-reasoned conclusions.\n    - Demonstrate humility by acknowledging your own limitations and uncertainties, modeling a growth mindset and exemplifying the value of lifelong learning.",
      },
      {
        role: 'user',
        content: 'Help me to understand the future of artificial intelligence.',
      },
    ],
  },
  {
    label: 'Generate a company memo based on provided points',
    value: [
      {
        role: 'user',
        content:
          'Draft a company memo to be distributed to all employees. The memo should cover the following specific points without deviating from the topics mentioned and not writing any fact which is not present here:\n    \n    Introduction: Remind employees about the upcoming quarterly review scheduled for the last week of April.\n    \n    Performance Metrics: Clearly state the three key performance indicators (KPIs) that will be assessed during the review: sales targets, customer satisfaction (measured by net promoter score), and process efficiency (measured by average project completion time).\n    \n    Project Updates: Provide a brief update on the status of the three ongoing company projects:\n    \n    a. Project Alpha: 75% complete, expected completion by May 30th.\n    b. Project Beta: 50% complete, expected completion by June 15th.\n    c. Project Gamma: 30% complete, expected completion by July 31st.\n    \n    Team Recognition: Announce that the Sales Team was the top-performing team of the past quarter and congratulate them for achieving 120% of their target.\n    \n    Training Opportunities: Inform employees about the upcoming training workshops that will be held in May, including "Advanced Customer Service" on May 10th and "Project Management Essentials" on May 25th.',
      },
    ],
  },
  {
    label: 'Generate product names from a description and seed words',
    value: [
      {
        role: 'system',
        content:
          'You will be provided with a product description and seed words, and your task is to generate product names.',
      },
      {
        role: 'user',
        content:
          'Product description: A home milkshake maker\n    Seed words: fast, healthy, compact.',
      },
    ],
  },
  {
    label: 'Detect sentiment in a tweet',
    value: [
      {
        role: 'system',
        content:
          'You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.',
      },
      {
        role: 'user',
        content: 'I loved the new Batman movie!',
      },
    ],
  },
  {
    label: 'Extract keywords from a block of text',
    value: [
      {
        role: 'system',
        content:
          'You will be provided with a block of text, and your task is to extract a list of keywords from it.',
      },
      {
        role: 'user',
        content:
          "Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha'po Owingeh and P'ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors.",
      },
    ],
  },
];
