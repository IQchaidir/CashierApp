import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../auth/useSession';

type Props = {
    id: number;
    name: string;
};

export default function useEditCategory() {
    const { session } = useSession();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['category'],
        mutationFn: async ({ name, id }: Props) => {
            if (!session?.token) return null;

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/category/${id}`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                },
            );
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
