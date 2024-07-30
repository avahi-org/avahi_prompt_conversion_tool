import dynamic from 'next/dynamic';
import React from 'react';

import type { GptOptionDataType } from '@/types/GptOptionDataType';
import { colourStyles } from '@/utils/constant';

import CopyTextButton from '../Button/CopyTextButton';
import CloseIcon from '../Icons/CloseIcon';
import SendIcon from '../Icons/SendIcon';

const Select = dynamic(() => import('react-select'), { ssr: false });
type InputChatProps = {
  className?: string;
  textareaClassName?: string;
  options?: GptOptionDataType[];
  defaultValue?: GptOptionDataType | undefined;
  selectChange?: (value: any) => void;
  title: string;
  description: string;
  textareaPlaceholder?: string;
  textareaId?: string;
  textareaName?: string;
  disabled?: boolean;
  textareaValue?: string | number | readonly string[] | undefined;
  textareaOnChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  isSend?: boolean;
  copyText?: string;
  isText?: boolean;
  selectedText?: string;
  height?: string;
  isCloseButton?: boolean;
  isLikeButton?: boolean;
  handleClear?: () => void;
};
const InputChat = ({
  className,
  options,
  defaultValue,
  selectChange,
  title,
  description,
  textareaPlaceholder,
  textareaId,
  textareaName,
  disabled,
  textareaValue,
  textareaOnChange,
  textareaClassName,
  isSend,
  copyText,
  isText,
  selectedText,
  height,
  isCloseButton,
  isLikeButton,
  handleClear,
}: InputChatProps) => {
  return (
    <div className={`px-5 py-6  sm:px-9 ${className} flex flex-col gap-6`}>
      {isText ? (
        <h3 className="w-fit rounded-lg border border-blue-10 bg-blue-30 p-2 font-poppins text-base font-medium leading-6 text-blue-40">
          {selectedText}
        </h3>
      ) : (
        <Select
          options={options}
          defaultValue={defaultValue}
          onChange={selectChange}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={colourStyles}
          placeholder="Select"
          className="w-fit min-w-48 font-poppins text-base font-medium leading-6"
        />
      )}
      <div className={`flex ${height} flex-col justify-between`}>
        <h3 className="text-3xl font-medium leading-[54px] text-black md:text-[36px]">
          {title}
        </h3>
        <p className="font-poppins text-sm font-medium leading-5 text-gray-150">
          {description}
        </p>
      </div>
      <div className="relative">
        <textarea
          className={`${textareaClassName} scrollbar-custom z-2 overflow-wrap break-word h-[348px]  max-h-[348px] min-h-[348px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border border-[#E2E0E5] bg-white p-6 ${
            isCloseButton || isLikeButton ? 'pr-[70px]' : ''
          }  font-poppins text-base font-normal text-black outline-none transition-all`}
          placeholder={textareaPlaceholder}
          data-gramm_editor="false"
          style={{ whiteSpace: 'pre-wrap' }}
          id={textareaId}
          name={textareaName}
          onChange={textareaOnChange}
          disabled={disabled}
          value={textareaValue}
        />
        {isCloseButton && (
          <button
            type="button"
            className="absolute right-6 top-6"
            onClick={handleClear}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 gap-y-3 xl:flex-row">
        {isSend && <div className="hidden w-full xl:block" />}
        <div
          className={`${
            isSend ? 'xl:w-full' : ''
          } flex gap-2 whitespace-nowrap`}
        >
          <CopyTextButton textValue={copyText} />
          {/* <ShareButton /> */}
        </div>

        {isSend && (
          <div className="flex items-center justify-end whitespace-nowrap xl:w-full">
            <button
              type="submit"
              className="pz flex items-center gap-2.5 rounded-lg border border-blue-30 bg-blue-10 p-3 text-base leading-6 tracking-[-0.5%] text-blackDark-100 transition-all duration-300 hover:bg-[#BFD6FF]"
            >
              <span>Convert prompts</span>
              <SendIcon />
            </button>
          </div>
        )}
        {/* {isLikeButton && (
          <button
            type="button"
            className="flex w-full items-center justify-end"
          >
            <LikeHardIcon />
          </button>
        )} */}
      </div>
    </div>
  );
};
export default InputChat;
