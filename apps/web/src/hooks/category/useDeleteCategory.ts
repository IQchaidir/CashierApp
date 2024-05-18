import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../useSession';

export default function useDeleteCategory() {
    const { session } = useSession();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!session?.token) return null;
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            queryClient.invalidateQueries({ queryKey: ['category'] });
            return await res.data;
        },
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
