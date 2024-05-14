import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, parseISO } from 'date-fns';

export function filterDate(filterType: string, customStartDate?: string, customEndDate?: string) {
    let filterStartDate: Date;
    let filterEndDate: Date;

    switch (filterType) {
        case 'today':
            filterStartDate = startOfDay(new Date());
            filterEndDate = endOfDay(new Date());
            break;
        case 'yesterday':
            const yesterday = subDays(new Date(), 1);
            filterStartDate = startOfDay(yesterday);
            filterEndDate = endOfDay(yesterday);
            break;
        case 'this week':
            filterStartDate = startOfWeek(new Date());
            filterEndDate = endOfWeek(new Date());
            break;
        case 'this month':
            filterStartDate = startOfMonth(new Date());
            filterEndDate = endOfMonth(new Date());
            break;
        case 'custom':
            if (!customStartDate || !customEndDate) {
                return 'Custom date range requires both start and end dates';
            }
            filterStartDate = startOfDay(parseISO(customStartDate));
            filterEndDate = endOfDay(parseISO(customEndDate));
            break;
        default:
            return 'Invalid filter type';
    }

    return { filterStartDate, filterEndDate };
}
