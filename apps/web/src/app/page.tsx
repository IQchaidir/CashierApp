import ListProduct from '@/components/ListProduct';
import OrderSummary from '@/components/OrderSummary';

export default function Home({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        category?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const search = searchParams?.search || '';
    const category = searchParams?.category || '';

    return (
        <div className="flex">
            <OrderSummary />
            <ListProduct page={currentPage} search={search} category={category} />
        </div>
    );
}
