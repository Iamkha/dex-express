import React from 'react';

interface IProps {
  messageError: string;
  classCSS?: string;
}

export const ErrorLogin: React.FC<IProps> = ({
  messageError,
  classCSS = 'mb-[32.5px] ',
}) => {
  return (
    <div
      className={`rounded-[5px] ${
        classCSS ? classCSS : ''
      } py-[18px] px-[26px] bg-red-ffe2e5`}
    >
      <span className="text-[13px]  text-red-f64e60">{messageError}</span>
    </div>
  );
};
