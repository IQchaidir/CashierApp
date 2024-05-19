import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useCreateTransaction() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const queryClient = useQueryClient();
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async ({
            method,
            cardNumber,
            products,
        }: {
            method: string;
            cardNumber: string;
            products: Array<{ productId: number; quantity: number }>;
        }) => {
            if (!token) return null;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/create`,
                { method, cardNumber, products },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            queryClient.invalidateQueries({ queryKey: ['products'] });
            return await res.data;
        },
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
