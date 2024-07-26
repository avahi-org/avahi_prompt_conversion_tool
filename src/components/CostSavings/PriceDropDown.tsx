import React, { useState } from 'react';

import TableDownArrow from '../Icons/TableDownArrow';
import IsCountPr from '../IsCountPr';

type PriceDropDownProps = {
  isPrShown?: boolean;
  count?: number;
  price: number;
  isDisabled?: boolean;
};

const PriceDropDown = ({
  isPrShown,
  price,
  count,
  isDisabled,
}: PriceDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-poppins text-base font-normal text-black">
            {`${price ? `$${price}` : '--'}`}
          </span>
          {isPrShown && count && (
            <IsCountPr isUp={true} count={Math.abs(Number(count))} />
          )}
        </div>

        <div
          className={`${
            isOpen && !isDisabled ? 'rotate-180' : ''
          } transition-all duration-300`}
        >
          <TableDownArrow />
        </div>
      </button>

      {isOpen && !isDisabled && (
        <div className="slide-in-down flex flex-col gap-3">
          <div className="flex flex-col items-start gap-1">
            <span className="font-poppins text-xs text-[#9E9E9E]">
              Input Token Price
            </span>
            <span className="font-poppins text-base text-black">$0.88</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-poppins text-xs text-[#9E9E9E]">
              Input Token Price
            </span>
            <span className="font-poppins text-base text-black">$0.88</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDropDown;
