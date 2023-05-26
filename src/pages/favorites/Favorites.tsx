/* eslint-disable react-hooks/exhaustive-deps */
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
import { PaginationEl } from '../../components/paginationEL/PaginationEl';

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const { favorites, vacancies, vacanciesStatus, total, page, count } = useAppSelector(
    (state) => state.vacancies
  );
  const [activePage, setactivePage] = useState(page + 1);
  const [favoritesState] = useState<number[]>(favorites);

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
  }, [dispatch, count]);

  useEffect(() => {
    if (favorites.length) {
      if (favoritesState.length !== favorites.length) {
        dispatch(
          vacanciesReq({
            ids: [...favorites],
            page: Math.ceil(favorites.length / count) - 1,
            count: count,
          })
        );
        setactivePage(Math.ceil(favorites.length / count));
      }
    } else {
      dispatch(resetVacancies());
    }
  }, [count, dispatch, favorites]);

  const handlePageChange = (value: number) => {
    if (value !== activePage) {
      setactivePage(value);
      dispatch(
        vacanciesReq({
          ids: [...favorites],
          page: value - 1,
          count: count,
        })
      );
    }
  };

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
                <PaginationEl
                  activePage={activePage}
                  pageOnChange={handlePageChange}
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
