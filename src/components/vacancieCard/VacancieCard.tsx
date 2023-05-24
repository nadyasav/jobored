import { Link } from 'react-router-dom';
import { IVacancie } from '../../types/types';
import styles from './VacancieCard.module.scss';
import { ROUTES } from '../../constants/constants';
import locationIcon from '../../assets/img/locationIcon.svg';
import { StarCheckbox } from '../starCheckbox/StarCheckbox';
import { addFavorite, removeFavorite } from '../../store/vacancies-slice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import cn from 'classnames';

export const VacancieCard = (props: {
  data: IVacancie;
  favorite: boolean;
  size?: 'large';
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const getPayment = (from = 0, to = 0): string | number => {
    if (from === to) {
      return from;
    } else if (from > 0 && to === 0) {
      return `от ${from}`;
    } else if (to > 0 && from === 0) {
      return `до ${to}`;
    } else {
      return `${from} - ${to}`;
    }
  };

  const handleStarChange = (value: boolean) => {
    if (value) {
      dispatch(addFavorite(props.data.id));
    } else {
      dispatch(removeFavorite(props.data.id));
    }
  };

  return (
    <Link
      to={`${ROUTES.vacancies}/${props.data.id}`}
      className={cn(styles.card, props.size && styles[props.size])}
      data-elem={`vacancy-${props.id}`}
    >
      <div className={styles.card__inner}>
        <h2 className={styles.card__title}>{props.data.profession}</h2>
        <div className={styles.card__conditions}>
          <p className={styles.card__conditions_payment}>
            <span>з/п </span>
            <span>{getPayment(props.data.payment_from, props.data.payment_to)} </span>
            <span>{props.data.currency}</span>
          </p>
          <p className={styles.card__conditions_type}>{props.data.type_of_work.title}</p>
        </div>
        <p className={styles.card__town}>
          <img src={locationIcon} alt="" />
          <span className={styles.card__town_title}>{props.data.town.title}</span>
        </p>
        <div className={styles.card__star}>
          <StarCheckbox
            dataElem={`vacancy-${props.id}-shortlist-button`}
            handleOnChange={handleStarChange}
            favorite={props.favorite}
          />
        </div>
      </div>
    </Link>
  );
};
