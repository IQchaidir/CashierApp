import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useLatestTransaction() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/latest`);
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
