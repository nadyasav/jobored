import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/img/logo.svg';
import { Wrapper } from '../wrapper/Wrapper';
import { ROUTES } from '../../constants/constants';
import { useState } from 'react';
import cn from 'classnames';
import { BurgerBtn } from '../burgerBtn/BurgerBtn';

export const Header = () => {
  const [menuState, setMenuState] = useState(false);

  const handleBurgerBtnClick = (value: boolean) => {
    setMenuState(value);
  };

  const handleNavLinkClick = () => {
    setMenuState(false);
  };

  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.header__inner}>
          <NavLink to={ROUTES.main} className={styles.header__logo_link}>
            <img src={logo} alt="logo" />
          </NavLink>
          <nav className={cn(styles.navigation, menuState && styles.active)}>
            <ul className={styles.navigation__list}>
              <li>
                <NavLink
                  to={ROUTES.main}
                  className={({ isActive }) =>
                    `${styles.navigation__link} ${isActive && styles.active}`
                  }
                  onClick={handleNavLinkClick}
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
                  onClick={handleNavLinkClick}
                >
                  Избранное
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.header__burger_btn}>
            <BurgerBtn menuState={menuState} handleClick={handleBurgerBtnClick} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};
