import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../auth/useSession';

type Props = {
    id: number;
    file: File;
    name: string;
    price: number;
    weight: number;
    category: number;
    description: string;
};

export default function useEditProduct() {
    const { session } = useSession();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ id, file, name, price, weight, category, description }: Props) => {
            if (!session?.token) return null;
            const formData = new FormData();

            formData.append('name', name);
            formData.append('price', String(price));
            formData.append('weight', String(weight));
            formData.append('category', String(category));
            formData.append('description', description);
            formData.append(`file`, file);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${session?.token}`,
                },
            };

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/update/${id}`,
                formData,
                config,
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
