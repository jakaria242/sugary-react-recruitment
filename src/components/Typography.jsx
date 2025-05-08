import React from 'react';
import { twMerge } from 'tailwind-merge';

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
};

const Typography = ({ variant = 'p', className, children, ...rest }) => {
  const Component = tagMap[variant] || 'p';

  return (
    <Component className={twMerge(className)} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;