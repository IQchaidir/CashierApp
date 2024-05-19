import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useSession from '../auth/useSession';

type Props = {
    id: number;
    user_name: string;
    email: string;
    password: string;
};

export default function useEditCashier() {
    const { session } = useSession();
    const { mutate, isPending, isError } = useMutation({
        mutationKey: [`/users/edit/${session?.token}`],
        mutationFn: async ({ user_name, email, password, id }: Props) => {
            if (!session?.token) return null;
            const payload: any = {
                user_name,
                email,
            };

            if (password) {
                payload.password = password;
            }

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/cashier/${id}`,
                {
                    ...payload,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
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
