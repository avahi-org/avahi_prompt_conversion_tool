import React from 'react';

type PriceCardProps = {
  price: number | null;
  timeDisplay: any;
  cunvertedData: any;
  title: string;
  className?: string;
};

const PriceCard = ({
  price,
  timeDisplay,
  cunvertedData,
  title,
  className,
}: PriceCardProps) => {
  return (
    <>
      {price && (
        <div
          className={`${className} col-span-2 mt-6 h-fit  rounded-lg bg-white p-7 shadow-card lg:col-span-1`}
        >
          <h3 className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-center text-2xl font-bold text-transparent">
            {title}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Price
              </p>
              <p className="break-words text-2xl font-bold text-green-600 dark:text-green-400">
                ${price?.toFixed(6)}
              </p>
            </div>

            {timeDisplay && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Time Taken
                </p>
                <p className="break-words text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {timeDisplay}
                </p>
              </div>
            )}

            {cunvertedData?.input_token_cost && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Input Token Cost
                </p>
                <p className="break-words text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  ${cunvertedData?.input_token_cost?.toFixed(6)}
                </p>
              </div>
            )}

            {cunvertedData?.output_token && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Output Token Cost
                </p>
                <p className="break-words text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  ${cunvertedData?.output_token?.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceCard;
