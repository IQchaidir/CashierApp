import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useTransaction(filterParams: any) {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['transaction', filterParams],
        queryFn: async () => {
            const queryString = new URLSearchParams(filterParams).toString();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction?${queryString}`);
            return await res.data;
        },
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
}
