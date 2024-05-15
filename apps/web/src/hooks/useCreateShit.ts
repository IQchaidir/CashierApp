import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useCreateShift() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async ({ initial_cash }: { initial_cash: number }) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/shift/start`,
                { initial_cash },
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
