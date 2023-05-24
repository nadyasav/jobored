import { Link } from 'react-router-dom';
import styles from './LinkBtn.module.scss';

interface ILinkBtn {
  path: string;
  children: React.ReactNode;
}

export const LinkBtn = (props: ILinkBtn) => {
  return (
    <Link to={props.path} className={styles.link_btn}>
      {props.children}
    </Link>
  );
};
