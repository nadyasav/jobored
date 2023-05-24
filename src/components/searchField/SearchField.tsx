import React, { useEffect, useState } from 'react';
import styles from './SearchField.module.scss';
import { CustomButton } from '../customButton/CustomButton';

export interface ISearchField {
  searchValue: string | undefined;
  handleOnChange: (value: string) => void;
  sendInputValue: () => void;
}

export const SearchField = (props: ISearchField) => {
  const [searchValue, setsearchValue] = useState<string | undefined>(
    props.searchValue ? props.searchValue : ''
  );

  useEffect(() => {
    if (!props.searchValue) {
      setsearchValue('');
    }
  }, [props.searchValue]);

  const handleInputValue = () => {
    props.sendInputValue();
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleInputValue();
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchValue(e.target.value);
    props.handleOnChange(e.currentTarget.value);
  };

  return (
    <div className={styles.search_box}>
      <input
        data-testid="searchInput"
        type="search"
        className={styles.search_input}
        onKeyDown={handleKeyDown}
        value={searchValue}
        onChange={handleInputOnChange}
        placeholder="Введите название вакансии..."
        data-elem="search-input"
      />
      <span className={styles.search_btn__box}>
        <CustomButton dataElem="search-button" type="button" handleClick={handleInputValue}>
          Поиск
        </CustomButton>
      </span>
    </div>
  );
};
