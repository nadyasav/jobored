import cn from 'classnames';

import styles from './CloseBtn.module.scss';

export const CloseBtn = (props: { sloseState: boolean; handleClick: (value: boolean) => void }) => {
  const handleButtonClick = () => {
    props.handleClick(!props.sloseState);
  };

  return (
    <button
      className={cn(styles.close_btn, props.sloseState && styles.active)}
      type="button"
      onClick={handleButtonClick}
    ></button>
  );
};
