import React from 'react';

const Button = props => {
  const { className = '', ...restProps } = props;
  const classes = `btn ${className}`;
  return (
    <button className={classes} type="button" {...restProps}>
      {props.children}
    </button>
  );
};

export default Button;
