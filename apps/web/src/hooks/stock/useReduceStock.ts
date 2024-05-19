import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../auth/useSession';

export default function useReduceStock() {
    const { session } = useSession();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['products'],
        mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
            if (!session?.token) return null;

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/stock/reduce/${productId}`,
                {
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
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
