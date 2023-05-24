import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/img/logo.svg';
import { Wrapper } from '../wrapper/Wrapper';
import { ROUTES } from '../../constants/constants';

export const Header = () => (
  <header className={styles.header}>
    <Wrapper>
      <div className={styles.header__inner}>
        <NavLink to={ROUTES.main} className={styles.header__logo_link}>
          <img src={logo} alt="logo" />
        </NavLink>
        <nav className={styles.navigation}>
          <ul className={styles.navigation__list}>
            <li>
              <NavLink
                to={ROUTES.main}
                className={({ isActive }) =>
                  `${styles.navigation__link} ${isActive && styles.active}`
                }
              >
                Поиск Вакансий
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.favorites}
                className={({ isActive }) =>
                  `${styles.navigation__link} ${isActive && styles.active}`
                }
              >
                Избранное
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  </header>
);
