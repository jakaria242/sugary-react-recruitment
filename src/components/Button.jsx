import React from 'react'
import cn from '../utils/cn.js'

const Button = ({btnText, icon, iconClass, customClass, ...restProps}) => {
  return (
    <button
    className={cn('px-6 py-3 text-sm text-white font-semibold bg-transparent border-2 border-[#3749bb] rounded capitalize cursor-pointer flex justify-center items-center gap-x-2', customClass)}
    {...restProps}
    >
        {btnText}

        {icon && <span className={cn('text-[17px]', iconClass)}>{icon}</span>}
    </button>
  )
}

export default Button