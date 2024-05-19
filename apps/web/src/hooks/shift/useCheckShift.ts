import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useCheckShift() {
    const cookies = useCookies();
    let session = cookies.get('session');
    let token: any = null;
    if (session) {
        token = JSON.parse(session).token;
    }
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
