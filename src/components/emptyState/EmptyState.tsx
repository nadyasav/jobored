import styles from './EmptyState.module.scss';
import favoritesEmptyImg from '../../assets/img/empty-favorites-img.png';

export const EmptyState = (props: { text: string }) => {
  return (
    <div className={styles.empty_state}>
      <img className={styles.empty_state__img} src={favoritesEmptyImg} alt="" />
      <p className={styles.empty_state__text}>{props.text}</p>
    </div>
  );
};
