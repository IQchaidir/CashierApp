import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useLogout() {
    const cookies = useCookies();
    let session = cookies.get('session');
    let token = null;
    if (session) {
        token = JSON.parse(session).token;
    }

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            if (!token) {
                // Handle jika tidak ada token
                return { message: 'Tidak ada sesi yang aktif' };
            }

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        },
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
}
