import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useSession from './useSession';

type Props = {
    file: File;
    name: string;
    price: number;
    weight: number;
    category: number;
    description: string;
};

export default function useCreateProduct() {
    const { session } = useSession();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ file, name, price, weight, category, description }: Props) => {
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

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product`, formData, config);

            return await res.data;
        },
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
