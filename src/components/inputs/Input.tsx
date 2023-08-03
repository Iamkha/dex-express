import React from 'react';

import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';

interface IProps {
  onChange?: any;
  value: any;
  placeholder?: string;
  type?: string;
  id?: string;
  onBlur?: any;
  error?: any;
  errorTitle?: string;
  touched?: any;
  classCSS?: string;
}

export const Input: React.FC<IProps> = ({
  value,
  errorTitle,
  onChange,
  placeholder,
  type = 'text',
  error = false,
  id,
  onBlur,
  touched,
  classCSS = '',
}) => {
  const getInputClasses = () => {
    if (touched && error) {
      return true;
    }
    if (touched === true && !error) {
      return false;
    }
    return undefined;
  };

  return (
    <div>
      <div className="flex w-full relative  justify-center items-center ">
        <input
          className={` ${
            classCSS !== ''
              ? classCSS
              : 'h-[50px] py-[16.25px] text-[14px] px-[19.5px]'
          }  rounded-[5px]  text-black-3f4254 w-full  bg-gray-f3f6f9 focus:bg-gray-ebedf3`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          onBlur={onBlur}
        />
        {getInputClasses() && (
          <BiErrorCircle className="text-red-f64e60 absolute right-[10px] text-[18px]" />
        )}
        {getInputClasses() === false && (
          <BsCheckLg className="absolute text-blue-3699ff right-[10px] text-[20px] " />
        )}
      </div>
      {error && touched && (
        <p className="text-[13px] text-black-3f4254">{errorTitle}</p>
      )}
    </div>
  );
};
