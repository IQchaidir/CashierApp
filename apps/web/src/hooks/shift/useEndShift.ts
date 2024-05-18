import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useEndShift() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async ({ id, final_cash }: { id: number; final_cash: number }) => {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/shift/${id}`,
                { final_cash },
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
