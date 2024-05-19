import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../useSession';

export default function useShiftById({ id }: { id: number }) {
    const { session } = useSession();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [`/shift/${id}/${session?.token}`],
        queryFn: async () => {
            if (!session?.token) return null;
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/shift/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });

            return await res.data;
        },
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
}
