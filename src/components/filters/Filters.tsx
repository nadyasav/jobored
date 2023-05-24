import React, { useEffect, useMemo, useState } from 'react';
import styles from './Filters.module.scss';
import { CustomSelect } from '../customSelect/CustomSelect';
import { CustomNumberInput } from '../customNumberInput/CustomNumberInput';
import { CustomButton } from '../customButton/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { resetFilters, setCatalogue, setPaymentFrom, setPaymentTo } from '../../store/filtersSlice';
import { getSelectData } from '../../utils/getSelectData';
import { IFilters } from '../../types/types';

export const Filters = (props: IFilters) => {
  const dispatch = useAppDispatch();
  const { catalogues } = useAppSelector((state) => state.catalogues);
  const [selectData] = useState<Array<{ value: string; label: string }>>(
    useMemo(() => getSelectData(catalogues), [])
  );
  const { keyword, catalogue, payment_from, payment_to } = useAppSelector((state) => state.filters);

  const handleCatalogueChange = (value: string) => {
    dispatch(setCatalogue(Number(value)));
  };
  const handlePaymentFromChange = (value: number) => {
    dispatch(setPaymentFrom(Number(value)));
  };
  const handlePaymentToChange = (value: number) => {
    dispatch(setPaymentTo(Number(value)));
  };

  const handleApply = () => {
    props.sendFilters();
  };

  const handleResetClick = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (!catalogue && !payment_from && !payment_to && !keyword) {
      props.sendFilters();
    }
  }, [keyword, catalogue, payment_from, payment_to]);

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filters__top}>
          <h2>Фильтры</h2>
          <button type="button" className={styles.filters__reset_btn} onClick={handleResetClick}>
            Сбросить все
            <span />
          </button>
        </div>
        <div className={styles.filters__item}>
          <CustomSelect
            label="Отрасль"
            placeholder="Выберете отрасль"
            handleSelectChange={handleCatalogueChange}
            data={selectData}
            defaultValue={catalogue ? catalogue.toString() : ''}
          />
        </div>
        <div className={styles.filters__item}>
          <div className={styles.filters__item_payment}>
            <CustomNumberInput
              defaultValue={payment_from}
              handleInputChange={handlePaymentFromChange}
              label="Оклад"
              placeholder="От"
              dataElem="salary-from-input"
            />
          </div>
          <div className={styles.filters__item_payment}>
            <CustomNumberInput
              defaultValue={payment_to}
              handleInputChange={handlePaymentToChange}
              placeholder="До"
              dataElem="salary-to-input"
            />
          </div>
        </div>
        <div className={styles.filters__btn}>
          <CustomButton
            dataElem="search-button"
            fullWidth={true}
            handleClick={handleApply}
            type="submit"
          >
            Применить
          </CustomButton>
        </div>
      </div>
    </>
  );
};
