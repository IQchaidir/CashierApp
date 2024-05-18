import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useSession from './useSession';

export default function useDeleteProduct() {
    const { session } = useSession();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!session?.token) return null;
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            return await res.data;
        },
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
