import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useReportProduct(filterParams: any) {
    const cookies = useCookies();
    let session = cookies.get('session');
    let token = null;
    if (session) {
        token = JSON.parse(session).token;
    }
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['reportProduct', filterParams],
        queryFn: async () => {
            const queryString = new URLSearchParams(filterParams).toString();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/report/product?${queryString}`, {
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
