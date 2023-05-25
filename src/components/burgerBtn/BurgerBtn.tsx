import cn from 'classnames';

import styles from './BurgerBtn.module.scss';

export const BurgerBtn = (props: { menuState: boolean; handleClick: (value: boolean) => void }) => {
  const handleButtonClick = () => {
    props.handleClick(!props.menuState);
  };

  return (
    <button
      className={cn(styles.burger_btn, props.menuState && styles.active)}
      type="button"
      onClick={handleButtonClick}
    >
      <div className={styles.burger_btn__inner}>
        <span />
        <span />
        <span />
      </div>
    </button>
  );
};
