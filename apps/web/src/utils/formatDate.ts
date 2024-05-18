import { format, parseISO } from 'date-fns';

export function formatDate(date: any) {
    const formatDate = parseISO(date);
    const formattedDate = format(formatDate, 'HH:mm:ss, dd/MM/yyyy ');
    return formattedDate;
}
