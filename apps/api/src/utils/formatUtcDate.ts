export function formattedUtcDate(dateString: string, isEndOfDay = false) {
    const localDate = new Date(`${dateString}T${isEndOfDay ? '23:59:59' : '00:00:00'}`);
    const utcDate = localDate.toISOString();
    return utcDate;
}
