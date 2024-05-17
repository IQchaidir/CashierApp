export const formatNumberDebit = (value: string) => {
    return value.replace(/\d{4}(?=.)/g, '$&-');
};
