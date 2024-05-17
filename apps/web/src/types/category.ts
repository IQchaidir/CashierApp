import { Product } from './product';

export type Category = {
    id: number;
    name: string;
    archive: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
};
