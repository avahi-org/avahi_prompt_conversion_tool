import React from 'react';

type TextareaProps = {
  placeholder: string;
  id: string;
  name: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  disabled?: boolean;
};

const Textarea = ({
  placeholder,
  id,
  name,
  value,
  onChange,
  disabled,
}: TextareaProps) => {
  return (
    <textarea
      className="scrollbar-custom z-2 overflow-wrap break-word  h-[398px] max-h-[300px] min-h-[400px] w-full shrink-0 grow-0 resize-none self-center overflow-y-auto rounded-md border bg-white p-4 text-[15px] font-normal text-black outline-none transition-all "
      placeholder={placeholder}
      data-gramm_editor="false"
      style={{ whiteSpace: 'pre-wrap' }}
      id={id}
      name={name}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
};

export default Textarea;
