import React from 'react';

import DownArrow from './Icons/DownArrow';

type IsCountPrProps = {
  count: number | string;
  isUp: boolean;
};
const IsCountPr = ({ count, isUp }: IsCountPrProps) => {
  return (
    <>
      {count && (
        <div
          className={`${
            !isUp
              ? 'bg-redLight-10 text-redLight-20'
              : 'bg-[#DBEBE4] text-greenLight-20 '
          } flex w-fit items-center justify-center rounded-full  px-3  py-1.5 `}
        >
          <p className="w-fit font-poppins text-sm font-medium">{count}%</p>
          <div className={`${!isUp ? 'rotate-180' : ''}`}>
            <DownArrow />
          </div>
        </div>
      )}
    </>
  );
};

export default IsCountPr;
