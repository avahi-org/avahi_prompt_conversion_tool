import React, { useState } from 'react';

import { calculateAmmount } from '@/utils/calculateAmmount';

import TableDownArrow from '../Icons/TableDownArrow';
import IsCountPr from '../IsCountPr';

type PriceDropDownProps = {
  isPrShown?: boolean;
  count?: number;
  price: number;
  isDisabled?: boolean;
  inputPrice?: number;
  outputPrice?: number;
};

const PriceDropDown = ({
  isPrShown,
  price,
  count,
  isDisabled,
  inputPrice,
  outputPrice,
}: PriceDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputToken = calculateAmmount(Number(inputPrice), Number(outputPrice));
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
            <IsCountPr
              isUp={inputToken?.isUp}
              count={Math.abs(
                Number(inputToken?.percentageDifference?.toFixed(2))
              )}
            />
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
            <span className="font-poppins text-base text-black">
              ${inputPrice}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-poppins text-xs text-[#9E9E9E]">
              Output Token Price
            </span>
            <span className="font-poppins text-base text-black">
              ${outputPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDropDown;
