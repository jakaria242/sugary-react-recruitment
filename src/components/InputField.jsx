import React from 'react';
import cn from '../utils/cn.js';

const InputField = ({
  type,
  name,
  placeholder,
  required = false,
  className = '',
  ...rest
}) => {
  return (

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full p-[15px] border border-[#ddd] bg-white rounded outline-none text-[15px]",
          className
        )}
        {...rest}
      />
  );
};

export default InputField;