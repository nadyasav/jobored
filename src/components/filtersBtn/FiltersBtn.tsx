import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import styles from './FiltersBtn.module.scss';
import cn from 'classnames';

export const FiltersBtn = (props: {
  filtersBtnState: boolean;
  handleClick: (value: boolean) => void;
}) => {
  const handleButtonClick = () => {
    props.handleClick(!props.filtersBtnState);
  };

  return (
    <ActionIcon
      size="lg"
      onClick={handleButtonClick}
      className={cn(styles.filters_btn, props.filtersBtnState && styles.active)}
    >
      <IconAdjustments size="1.625rem" />
    </ActionIcon>
  );
};
