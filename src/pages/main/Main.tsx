import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { vacanciesReq } from '../../store/vacancies-slice';
import { Preloader } from '../../components/preloader/Preloader';
import { REQUEST_STATUS } from '../../constants/constants';
import { cataloguesReq } from '../../store/catalogues-slice';
import styles from './Main.module.scss';
import { Filters } from '../../components/filters/Filters';
import { Wrapper } from '../../components';
import { VacancieCard } from '../../components/vacancieCard/VacancieCard';
import { IVacancieParams } from '../../types/types';
import { EmptyState } from '../../components/emptyState/EmptyState';
import { SearchField } from '../../components/searchField/SearchField';
import { setKeyword } from '../../store/filtersSlice';
import { Pagination } from '@mantine/core';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { vacanciesStatus, favorites } = useAppSelector((state) => state.vacancies);
  const { cataloguesStatus } = useAppSelector((state) => state.catalogues);
  const { catalogues } = useAppSelector((state) => state.catalogues);
  const { vacancies, total, page, count } = useAppSelector((state) => state.vacancies);
  const { keyword, catalogue, payment_from, payment_to } = useAppSelector((state) => state.filters);
  const [activePage, setactivePage] = useState(page + 1);
  const [requestParams, setRequestParams] = useState<IVacancieParams>({
    page: page,
    count: count,
    keyword: keyword,
    catalogues: catalogue,
    payment_from: payment_from,
    payment_to: payment_to,
  });

  useEffect(() => {
    if (!catalogues.length) {
      dispatch(cataloguesReq());
    }
  }, [catalogues.length, dispatch]);

  const updateVacancies = () => {
    if (
      requestParams.keyword !== keyword ||
      requestParams.catalogues !== catalogue ||
      requestParams.payment_from !== payment_from ||
      requestParams.payment_to !== payment_to
    ) {
      setRequestParams({
        page: activePage - 1,
        count: count,
        keyword: keyword,
        catalogues: catalogue,
        payment_from: payment_from,
        payment_to: payment_to,
        no_agreement: payment_from || payment_to ? 1 : undefined,
      });
    }
  };

  useEffect(() => {
    dispatch(
      vacanciesReq({
        ...requestParams,
        page: activePage - 1,
      })
    );
  }, [requestParams, activePage]);

  const handleApplyFilters = () => {
    updateVacancies();
  };

  const handleSearchFieldChange = (value: string) => {
    dispatch(setKeyword(value));
  };

  return (
    <>
      <section className={styles.main}>
        <Wrapper>
          <div className={styles.main__container}>
            <div className={styles.main__inner}>
              <div className={styles.main__filters}>
                {catalogues.length > 0 && <Filters sendFilters={handleApplyFilters} />}
              </div>
              <div className={styles.main__content}>
                <div className={styles.main__search}>
                  <SearchField
                    searchValue={keyword}
                    handleOnChange={handleSearchFieldChange}
                    sendInputValue={handleApplyFilters}
                  />
                </div>
                <div className={styles.main__cards}>
                  {vacancies.length > 0 ? (
                    vacancies.map((item) => {
                      return favorites.indexOf(item.id) > -1 ? (
                        <VacancieCard id={item.id} data={item} key={item.id} favorite={true} />
                      ) : (
                        <VacancieCard id={item.id} data={item} key={item.id} favorite={false} />
                      );
                    })
                  ) : (
                    <div className={styles.main__card__empty}>
                      <EmptyState text="Упс, здесь ничего нет!" />
                    </div>
                  )}
                </div>
                {total > 0 && (
                  <div className={styles.main__pagination_box}>
                    <Pagination
                      value={activePage}
                      onChange={setactivePage}
                      total={total}
                      siblings={1}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
      {(vacanciesStatus === REQUEST_STATUS.pending ||
        cataloguesStatus === REQUEST_STATUS.pending) && <Preloader />}
    </>
  );
};
