import { formatDate } from '../../../helpers/dates';
import { CallDictionary } from './type';

export const getGroupedItems = (calls: Call[]) =>
  calls.reduce((acc: CallDictionary, item: any) => {
    const date: string = formatDate(item.created_at, 'LLL d');
    if (!acc.hasOwnProperty(date)) {
      acc[date] = [];
    }

    acc[date].push(item);
    return acc;
  }, {});
