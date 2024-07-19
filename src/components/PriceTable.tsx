import React from 'react';

type PriceTableProps = {
  price: number | null;
  timeDisplay: any;
  cunvertedData: any;
  title: string;
  className?: string;
};

const PriceTable = ({
  title,
  price,
  timeDisplay,
  cunvertedData,
}: PriceTableProps) => {
  return (
    <>
      {price && (
        <div>
          <h3 className="w-full  px-4 py-1 text-center font-poppins text-base font-semibold uppercase">
            {title}
          </h3>

          <div className="flex flex-col items-center gap-3 p-4">
            <div className="flex w-[170px] flex-col items-center rounded-md border px-4 py-1 shadow-card">
              <h3 className="w-full text-center text-sm">Total Price</h3>
              <span className="w-full text-center text-lg font-bold">
                ${price?.toFixed(6)}
              </span>
            </div>
            <div className="flex w-[170px] flex-col items-center rounded-md border px-4 py-1 shadow-card">
              <h3 className="w-full text-center text-sm">Input Token Cost</h3>
              <span className="w-full text-center text-lg font-bold">
                ${cunvertedData?.input_token_cost?.toFixed(6)}
              </span>
            </div>
            <div className="flex w-[170px] flex-col items-center rounded-md border px-4 py-1 shadow-card">
              <h3 className="w-full text-center text-sm">Output Token Cost</h3>
              <span className="w-full text-center text-lg font-bold">
                ${cunvertedData?.output_token?.toFixed(6)}
              </span>
            </div>
            <div className="flex w-[170px] flex-col items-center rounded-md border px-4 py-1 shadow-card">
              <h3 className="w-full text-center text-sm">Time Taken</h3>
              <span className="w-full text-center text-lg font-bold">
                {timeDisplay}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceTable;
