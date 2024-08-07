import React from 'react';

import TopBottomDropDownIcon from '../Icons/TopBottomDropDownIcon';
import jsonData from './costTable.json';
import PriceDropDown from './PriceDropDown';

type Prompt = {
  'OpenAI Prompt'?: string;
  'Bedrock Prompt'?: string;
  'OpenAI Input Token Cost'?: number;
  'Bedrock Input Token Cost'?: number;
  'Total Cost?': number;
  'Input Token Cost'?: number;
  'Output Token Cost'?: number;
};

type CostTableProps = {
  data: Prompt[];
  isShowOutput?: boolean;
};

const OPENAI_PROMPT = 'OpenAI Prompt';
const BEDROCK_PROMPT = 'Bedrock Prompt';
const INPUT_TOKEN_COST = 'Input Token Cost';
const OUTPUT_TOKEN_COST = 'Output Token Cost';
const OPENAI_INPUT_TOKEN_COST = 'OpenAI Input Token Cost';
const BEDROCK_INPUT_TOKEN_COST = 'Bedrock Input Token Cost';
// const TOTAL_COST = 'Total Cost';

const CostTable = ({ data, isShowOutput }: CostTableProps) => {
  console.log(isShowOutput);
  const headerData = jsonData?.header;
  return (
    <table className="w-full min-w-[1140px] overflow-y-hidden overflow-x-scroll">
      <thead className="sticky top-0 ">
        <tr className="flex justify-between gap-9 bg-white pb-2">
          {headerData?.map((item, index) => (
            <th
              key={index}
              className="w-full text-start text-sm font-medium text-gray-150"
            >
              <div className="flex cursor-pointer items-center gap-2">
                <span>{item}</span>
                <TopBottomDropDownIcon />
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((items, index) => (
          <tr
            key={index}
            className="flex justify-between gap-9 py-6 first:pt-4 last:pb-0"
          >
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto  pr-4">
              <span className="break-words font-poppins text-base font-normal text-black">
                {items?.[`${OPENAI_PROMPT}`] || '--'}
              </span>
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pr-4">
              <span className="break-words font-poppins text-base font-normal text-black">
                {items?.[`${BEDROCK_PROMPT}`] || '--'}
              </span>
            </td>
            <td className="table-scrollbar max-h-[160px] w-full overflow-y-auto  pr-4">
              <PriceDropDown
                price={
                  items?.[`${INPUT_TOKEN_COST}`] ||
                  items?.[`${OPENAI_INPUT_TOKEN_COST}`] ||
                  0
                }
                inputPrice={
                  items?.[`${INPUT_TOKEN_COST}`] ||
                  items?.[`${OPENAI_INPUT_TOKEN_COST}`] ||
                  0
                }
                outputPrice={
                  items?.[`${OUTPUT_TOKEN_COST}`] ||
                  items?.[`${BEDROCK_INPUT_TOKEN_COST}`] ||
                  0
                }
              />
            </td>
            <td className="table-scrollbar max-h-[160px] min-h-[160px] w-full overflow-y-auto  pr-4">
              <PriceDropDown
                price={
                  items?.[`${OUTPUT_TOKEN_COST}`] ||
                  items?.[`${BEDROCK_INPUT_TOKEN_COST}`] ||
                  0
                }
                inputPrice={
                  items?.[`${INPUT_TOKEN_COST}`] ||
                  items?.[`${OPENAI_INPUT_TOKEN_COST}`] ||
                  0
                }
                outputPrice={
                  items?.[`${OUTPUT_TOKEN_COST}`] ||
                  items?.[`${BEDROCK_INPUT_TOKEN_COST}`] ||
                  0
                }
                isPrShown={true}
                count={50}
              />
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
              <span className="font-poppins text-base font-normal text-black">
                {'--'}
              </span>
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
              {/* {bedrock_latency ? (
                <div className="flex items-center gap-2.5">
                  <span className="whitespace-nowrap font-poppins text-base font-normal text-black">
                    {bedrock_latency?.secound} s
                  </span>
                  <IsCountPr
                    isUp={true}
                    count={Math.abs(
                      Number(bedrock_latency?.difference?.toFixed(2))
                    )}
                  />
                </div>
              ) : ( */}
              --
              {/* )} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CostTable;
