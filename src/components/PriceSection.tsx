/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';

import { calculateAmmount } from '@/utils/calculateAmmount';

import InfoIcon from './Icons/InfoIcon';
import IsCountPr from './IsCountPr';

type PriceSectionProps = {
  price: number | null;
  timeDisplay: any;
  cunvertedData: any;
  title: string;
  isGreenText?: boolean;
  outputPrice?: number | null;
  inputPrice?: number | null;
  isShowPrPrice?: boolean;
  inputCunvertedData?: any;
  inputTimeDisplay?: any;
};
const PriceSection = ({
  price,
  cunvertedData,
  timeDisplay,
  title,
  isGreenText,
  isShowPrPrice,
  inputCunvertedData,
  inputTimeDisplay,
  inputPrice,
}: PriceSectionProps) => {
  const bedrockCost = (cunvertedData?.output_token * 1000).toFixed(2);
  const inputCost = (cunvertedData?.input_token_cost * 1000).toFixed(2);
  const inputPriceFix = price ? (price * 1000).toFixed(2) : '';
  const pricePr = calculateAmmount(Number(inputPrice), Number(price));
  const timeTaken = calculateAmmount(
    Number(inputTimeDisplay),
    Number(timeDisplay)
  );
  const outputToken = calculateAmmount(
    Number(inputCunvertedData?.output_token),
    Number(cunvertedData?.output_token)
  );
  const inputToken = calculateAmmount(
    Number(inputCunvertedData?.input_token_cost),
    Number(cunvertedData?.input_token_cost)
  );
  return (
    <>
      {price && (
        <div className="flex w-full flex-col gap-6 1140:w-1/2">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="font-poppins  text-xl font-medium leading-8 text-black 2xl:text-2xl">
              {title}
            </h3>

            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-normal">
              <span className="whitespace-nowrap  font-poppins  text-base font-medium text-gray-150">
                Cost of running
              </span>
              <span className="whitespace-nowrap rounded-lg border border-blue-30 bg-blue-10 p-2 font-poppins text-base font-medium text-blue-20">
                1000 times
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className={`flex cursor-pointer flex-col gap-5 rounded-xl border ${
                isGreenText
                  ? 'border-greenLight-10 hover:border-greenLight-20 hover:bg-greenLight-10'
                  : 'border-[#FFD7D7] hover:border-redLight-20 hover:bg-redLight-10'
              } bg-white p-4 transition-all 2xl:p-6`}
            >
              <div
                className={`flex items-center justify-between ${
                  isGreenText ? 'text-greenLight-20' : 'text-redLight-20'
                }`}
              >
                <span
                  className={`font-poppins text-base font-medium ${
                    isGreenText ? 'text-greenLight-20' : 'text-redLight-20'
                  } `}
                >
                  Total price
                </span>
                <InfoIcon />
              </div>
              <span
                className={`${
                  isGreenText ? 'text-greenLight-20' : 'text-redLight-20'
                } flex items-center
                  gap-2 text-3xl font-medium leading-8 2xl:gap-4 2xl:text-[36px]`}
              >
                ${inputPriceFix}
                {isShowPrPrice && (
                  <IsCountPr
                    isUp={pricePr?.isUp}
                    count={Math.abs(
                      Number(pricePr?.percentageDifference?.toFixed(2))
                    )}
                  />
                )}
              </span>
            </div>
            <div className="group flex cursor-pointer flex-col gap-5 rounded-xl border border-[#D8E6FF] bg-blue-10 p-4 transition-all  hover:bg-white 2xl:p-6">
              <span className="font-poppins text-base font-medium text-black">
                Input Token Cost
              </span>
              <span
                className={`flex items-center gap-2 text-3xl font-medium leading-8 text-black 2xl:gap-4 2xl:text-[36px] ${
                  isGreenText
                    ? 'group-hover:text-blue-20'
                    : 'group-hover:text-redLight-20'
                }`}
              >
                ${inputCost}
                {isShowPrPrice && (
                  <IsCountPr
                    isUp={inputToken?.isUp}
                    count={Math.abs(
                      Number(inputToken?.percentageDifference?.toFixed(2))
                    )}
                  />
                )}
              </span>
            </div>
            <div className="group flex cursor-pointer flex-col gap-5 rounded-xl border border-[#D8E6FF] bg-blue-10 p-4 transition-all  hover:bg-white 2xl:p-6">
              <span className="font-poppins text-base font-medium text-black">
                Time Taken
              </span>
              <span
                className={`flex items-center gap-2 text-3xl font-medium leading-8 text-black 2xl:gap-4 2xl:text-[36px] ${
                  isGreenText
                    ? 'group-hover:text-blue-20'
                    : 'group-hover:text-redLight-20'
                }`}
              >
                {timeDisplay}s
                {isShowPrPrice && (
                  <IsCountPr
                    isUp={timeTaken?.isUp}
                    count={Math.abs(
                      Number(timeTaken?.percentageDifference?.toFixed(2))
                    )}
                  />
                )}
              </span>
            </div>
            <div
              className={`group flex cursor-pointer flex-col gap-5 rounded-xl border border-[#D8E6FF] bg-blue-10 p-4 transition-all  hover:bg-white  2xl:p-6`}
            >
              <span className="font-poppins text-base font-medium text-black">
                Output Token Cost
              </span>
              <span
                className={`flex items-center gap-2 text-3xl  font-medium leading-8 text-black 2xl:gap-4 2xl:text-[36px] ${
                  isGreenText
                    ? 'group-hover:text-blue-20'
                    : 'group-hover:text-redLight-20'
                }`}
              >
                ${bedrockCost}
                {isShowPrPrice && (
                  <IsCountPr
                    isUp={outputToken?.isUp}
                    count={Math.abs(
                      Number(outputToken?.percentageDifference?.toFixed(2))
                    )}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PriceSection;
