import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function useCreateCategory() {
    const cookies = useCookies();
    const session: any = cookies.get('session');
    const { token } = JSON.parse(session);
    const queryClient = useQueryClient();
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async ({ name }: { name: string }) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/category`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
