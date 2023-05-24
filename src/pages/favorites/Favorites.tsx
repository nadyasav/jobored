import React, { useEffect, useState } from 'react';

import styles from './Favorites.module.scss';
import { Wrapper } from '../../components';
import { EmptyState } from '../../components/emptyState/EmptyState';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { resetVacancies, vacanciesReq } from '../../store/vacancies-slice';
import { VacancieCard } from '../../components/vacancieCard/VacancieCard';
import { REQUEST_STATUS, ROUTES } from '../../constants/constants';
import { Preloader } from '../../components/preloader/Preloader';
import { LinkBtn } from '../../components/linkBtn/LinkBtn';
import { Pagination } from '@mantine/core';

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const { favorites, vacancies, vacanciesStatus, total, page, count } = useAppSelector(
    (state) => state.vacancies
  );
  const [activePage, setactivePage] = useState(page + 1);

  useEffect(
    () => () => {
      dispatch(resetVacancies());
    },
    [dispatch]
  );

  useEffect(() => {
    if (favorites.length) {
      dispatch(
        vacanciesReq({
          ids: [...favorites],
          page: activePage - 1,
          count: count,
        })
      );
    } else {
      dispatch(resetVacancies());
    }
  }, [dispatch, favorites, favorites.length, activePage]);

  return (
    <section className={styles.favorites}>
      <Wrapper>
        {vacancies.length > 0 ? (
          <div className={styles.favorites__inner}>
            <div className={styles.favorites__cards}>
              {vacancies.map((item) => (
                <VacancieCard id={item.id} data={item} key={item.id} favorite={true} />
              ))}
            </div>
            {total > 0 && (
              <div className={styles.favorites__pagination_box}>
                <Pagination
                  value={activePage}
                  onChange={setactivePage}
                  total={total}
                  siblings={1}
                />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.favorites__empty}>
            <EmptyState text="Упс, здесь еще ничего нет!" />
            <div className={styles.favorites__empty_link}>
              <LinkBtn path={ROUTES.main}>Поиск Вакансий</LinkBtn>
            </div>
          </div>
        )}
      </Wrapper>
      {vacanciesStatus === REQUEST_STATUS.pending && <Preloader />}
    </section>
  );
};
