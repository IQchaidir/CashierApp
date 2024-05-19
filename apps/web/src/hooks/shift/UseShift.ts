import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useShift(filterParams: any) {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['shift', filterParams],
        queryFn: async () => {
            const queryString = new URLSearchParams(filterParams).toString();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/shift?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
