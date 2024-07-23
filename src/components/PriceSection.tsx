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
        <div className="flex w-1/2 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins text-2xl font-medium leading-8 text-black">
              {title}
            </h3>

            <div className="flex items-center gap-3">
              <span className="font-poppins text-base font-medium text-gray-150">
                Cost of running
              </span>

              <span className="rounded-lg border border-blue-30 bg-blue-10 p-2 font-poppins text-base font-medium text-blue-20">
                1000 times
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`flex flex-col gap-5 rounded-xl border ${
                isGreenText ? 'border-greenLight-10' : 'border-[#FFD7D7]'
              } bg-white p-6`}
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
                  gap-4 text-[36px] font-medium leading-8`}
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

            <div className="flex flex-col gap-5 rounded-xl border border-[D8E6FF] bg-blue-10 p-6">
              <span className="font-poppins text-base font-medium text-black">
                Input Token Cost
              </span>
              <span className="flex items-center gap-4 text-[36px] font-medium leading-8 text-black">
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

            <div className="flex flex-col gap-5 rounded-xl border border-[D8E6FF] bg-blue-10 p-6">
              <span className="font-poppins text-base font-medium text-black">
                Time Taken
              </span>
              <span className="flex items-center gap-4 text-[36px] font-medium leading-8 text-black">
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

            <div className="flex flex-col gap-5 rounded-xl border border-[D8E6FF] bg-blue-10 p-6">
              <span className="font-poppins text-base font-medium text-black">
                Output Token Cost
              </span>
              <span className="flex items-center gap-4 text-[36px] font-medium leading-8 text-black">
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
