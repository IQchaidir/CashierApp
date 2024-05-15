import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useCheckShift() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/shift/check`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return await res.data;
        },
    });

    return {
        mutate,
        isPending,
        isError,
    };
}