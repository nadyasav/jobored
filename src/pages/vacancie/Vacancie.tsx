import React, { useEffect } from 'react';

import styles from './Vacancie.module.scss';
import { Wrapper } from '../../components';
import { EmptyState } from '../../components/emptyState/EmptyState';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { VacancieCard } from '../../components/vacancieCard/VacancieCard';
import { REQUEST_STATUS, ROUTES } from '../../constants/constants';
import { Preloader } from '../../components/preloader/Preloader';
import { LinkBtn } from '../../components/linkBtn/LinkBtn';
import { useParams } from 'react-router-dom';
import {
  resetVacancieSingle,
  setVacancieSingle,
  vacancieSingleReq,
} from '../../store/vacancieSingleSlice';

export const Vacancie = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { vacancieSingle, vacancieSingleStatus } = useAppSelector((state) => state.vacancieSingle);
  const { vacancies, favorites } = useAppSelector((state) => state.vacancies);

  useEffect(
    () => () => {
      dispatch(resetVacancieSingle());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!vacancieSingle) {
      if (id) {
        if (vacancies.length) {
          const vacansieArr = vacancies.filter((el) => el.id === Number(id));
          if (vacansieArr.length) {
            dispatch(setVacancieSingle(vacansieArr[0]));
          } else {
            dispatch(vacancieSingleReq(id));
          }
        } else {
          dispatch(vacancieSingleReq(id));
        }
      }
    }
  }, [id, dispatch, vacancies, vacancieSingle]);

  return (
    <section className={styles.vacancie}>
      <Wrapper>
        {vacancieSingle ? (
          <div className={styles.vacancie__card}>
            <VacancieCard
              id={Number(id)}
              data={vacancieSingle}
              favorite={favorites.indexOf(vacancieSingle.id) > -1 ? true : false}
              size="large"
            />
            <div
              className={styles.vacancie__description}
              dangerouslySetInnerHTML={{ __html: vacancieSingle.vacancyRichText }}
            />
          </div>
        ) : (
          <div className={styles.vacancie__empty}>
            <EmptyState text="Упс, здесь ничего нет!" />
            <div className={styles.vacancie__empty_link}>
              <LinkBtn path={ROUTES.main}>Поиск Вакансий</LinkBtn>
            </div>
          </div>
        )}
      </Wrapper>
      {vacancieSingleStatus === REQUEST_STATUS.pending && <Preloader />}
    </section>
  );
};
