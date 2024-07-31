import React from 'react';

type CostSavingCartProps = {
  className?: string;
  isCostSaving?: boolean;
};

const CostSavingCart = ({ className, isCostSaving }: CostSavingCartProps) => {
  return (
    <div className={`flex w-full flex-col gap-4  ${className}`}>
      <h4 className="font-poppins text-sm font-semibold text-blackDark-100">
        COST SAVINGS
      </h4>

      <div className="flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-end">
        <div className="flex items-center gap-9">
          <div className="flex flex-col gap-1">
            <span className="font-poppins text-3xl font-semibold text-greenLight-20 sm:text-4xl">
              $1000
            </span>
            <span className="font-poppins text-sm font-normal text-gray-75">
              Total Saved
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-poppins text-3xl font-semibold text-greenLight-20 sm:text-4xl">
              50m
            </span>
            <span className="font-poppins text-sm font-normal text-gray-75">
              Time saved
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-poppins text-3xl font-semibold text-greenLight-20 sm:text-4xl">
              50m
            </span>
            <span className="font-poppins text-sm font-normal text-gray-75">
              # of prompts
            </span>
          </div>
        </div>

        {isCostSaving && (
          <div className="flex items-center gap-3">
            <span className="font-poppins text-base font-medium leading-6 text-gray-150">
              Cost of running
            </span>

            <span className="w-fit rounded-lg border border-blue-30 bg-blue-30 p-2 font-poppins text-base font-medium leading-6 text-blue-40">
              1000 times
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostSavingCart;
