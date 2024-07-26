import React from 'react';

import TopBottomDropDownIcon from '../Icons/TopBottomDropDownIcon';
import jsonData from './costTable.json';
import PriceDropDown from './PriceDropDown';

const CostTable = () => {
  return (
    <table className="w-full overflow-y-hidden">
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
        {Array.from({ length: 2 }).map((_, i) => (
          <tr
            key={i}
            className="flex justify-between gap-9 py-6 first:pt-4 last:pb-0"
          >
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pr-4">
              <span className="w-full break-words font-poppins text-base font-normal text-black">
                ---
              </span>
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pr-4">
              <span className="break-words font-poppins text-base font-normal text-black">
                ---
              </span>
            </td>
            <td className="table-scrollbar max-h-[160px] w-full overflow-y-auto pr-4">
              <PriceDropDown price={Number('0.00')} isDisabled={true} />
            </td>
            <td className="table-scrollbar max-h-[160px] min-h-[160px] w-full overflow-y-auto pr-4">
              <PriceDropDown price={Number('0.00')} isDisabled={true} />
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
              <span className="font-poppins text-base font-normal text-black">
                0 s
              </span>
            </td>
            <td className="table-scrollbar max-h-[150px] w-full overflow-y-auto pb-3 pr-4">
              0 s
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CostTable;
