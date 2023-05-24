import React from 'react';
import styles from './IconDropDown.module.scss';
import cn from 'classnames';

export const IconDropDown = (props: { open: boolean }) => {
  return (
    <svg
      className={cn(styles.svg, props.open && styles.open)}
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
