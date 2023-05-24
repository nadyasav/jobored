export interface IUserData {
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: number;
}

export interface IAuthData {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
}

export interface IVacancie {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
  type_of_work: {
    id: number;
    title: string;
  };
  payment_from?: number;
  payment_to?: number;
  currency: string;
  [x: string]: unknown;
  vacancyRichText: string;
}

export interface IVacancieParams {
  ids?: Array<number>;
  published?: 0 | 1 | 3;
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: Array<number> | number;
  payment_from?: number;
  payment_to?: number;
  page?: number;
  count?: number;
  no_agreement?: number;
}

export interface ICatalogue {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: Array<ICataloguePosition>;
}

export interface ICataloguePosition {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export interface IFilters {
  sendFilters: () => void;
}
