import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useProductById({ id }: { id: string }) {
    const cookies = useCookies();
    let session = cookies.get('session');
    let token: any = null;
    if (session) {
        token = JSON.parse(session).token;
    }
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [`/product/${id}`],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${id}`, {
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
