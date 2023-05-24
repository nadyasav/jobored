import styles from './Wrapper.module.scss';

interface IChildren {
  children: React.ReactNode;
}

export const Wrapper = (props: IChildren) => <div className={styles.wrapper}>{props.children}</div>;
