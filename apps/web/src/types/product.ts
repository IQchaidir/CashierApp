import { Transaction_Product } from './transaction';

export type Product = {
    id: number;
    name: string;
    description: string;
    category_id: number;
    price: number;
    stock: number;
    image: string;
    archive: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    Transaction_Product: Transaction_Product[];
};
