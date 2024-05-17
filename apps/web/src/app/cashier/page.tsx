import ListProduct from '@/app/cashier/_component/ListProduct';
import OrderSummary from './_component/OrderSummary';

const CashierPage = ({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        category?: string;
        page?: string;
    };
}) => {
    const currentPage = Number(searchParams?.page) || 1;
    const search = searchParams?.search || '';
    const category = searchParams?.category || '';

    return (
        <div className="flex">
            <OrderSummary />
            <ListProduct page={currentPage} search={search} category={category} />
        </div>
    );
};

export default CashierPage;
