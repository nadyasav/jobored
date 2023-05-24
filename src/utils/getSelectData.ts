import { ICatalogue } from '../types/types';

export function getSelectData(data: Array<ICatalogue>): Array<{ value: string; label: string }> {
  const cataloguesData = data.map((el) => ({
    value: el.key.toString(),
    label: el.title_trimmed,
  }));
  return cataloguesData;
}
