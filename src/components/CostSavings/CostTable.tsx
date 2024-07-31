import React from 'react';

import TopBottomDropDownIcon from '../Icons/TopBottomDropDownIcon';
import IsCountPr from '../IsCountPr';
import jsonData from './costTable.json';
import PriceDropDown from './PriceDropDown';

const CostTable = () => {
  return (
    <table className="w-full min-w-[1140px] overflow-y-hidden overflow-x-scroll">
      <thead className="sticky top-0 ">
        <tr className="flex justify-between gap-9 bg-white pb-2">
          {jsonData?.header?.map((item, index) => (
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
        {jsonData?.body?.map(
          ({
            id,
            openAI_prompt,
            bedrock_promp,
            openAI_total_price,
            bedrock_total_price,
            openAI_latency,
            bedrock_latency,
          }) => (
            <tr
              key={id}
              className="flex justify-between gap-9 py-6 first:pt-4 last:pb-0"
            >
              <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto  pr-4">
                <span className="break-words font-poppins text-base font-normal text-black">
                  {openAI_prompt || '--'}
                </span>
              </td>
              <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pr-4">
                <span className="break-words font-poppins text-base font-normal text-black">
                  {bedrock_promp || '--'}
                </span>
              </td>
              <td className="table-scrollbar max-h-[160px] w-full overflow-y-auto  pr-4">
                <PriceDropDown price={openAI_total_price} />
              </td>
              <td className="table-scrollbar max-h-[160px] min-h-[160px] w-full overflow-y-auto  pr-4">
                <PriceDropDown
                  price={bedrock_total_price?.price}
                  isPrShown={true}
                  count={50}
                />
              </td>
              <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
                <span className="font-poppins text-base font-normal text-black">
                  {openAI_latency ? `${openAI_latency} s` : '--'}
                </span>
              </td>
              <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
                {bedrock_latency ? (
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
                ) : (
                  '--'
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default CostTable;
