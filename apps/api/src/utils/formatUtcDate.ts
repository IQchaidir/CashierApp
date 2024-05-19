export function formattedUtcDate(dateString: string, isEndOfDay = false) {
    const utcDate = `${dateString}T${isEndOfDay ? '23:59:59.999Z' : '00:00:00.000Z'}`;
    return utcDate;
}

export function formatToDateTimeString(date: Date, endOfDay = false): string {
    if (endOfDay) {
        date.setUTCHours(23, 59, 59, 999);
    } else {
        date.setUTCHours(0, 0, 0, 0);
    }
    return date.toISOString();
}
