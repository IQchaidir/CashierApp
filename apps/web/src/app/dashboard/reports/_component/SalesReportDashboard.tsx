'use client';
import { Banknote, Barcode, Package } from 'lucide-react';
import { FilterDateReport } from './FilterDateReport';
import TransactionReport from './TransactionReport';
import ProductReport from './ProductReport';
import useReportSales from '@/hooks/useReportsSales';
import useReportProduct from '@/hooks/useReportsProduct';
import { useEffect } from 'react';
import { formatToRupiah } from '@/utils/formatToRupiah';

export default function SalesReportDashboard({ startDate, endDate }: { startDate: any; endDate: any }) {
    const { data: salesData, refetch: refetchSalesData } = useReportSales({
        start_date: startDate,
        end_date: endDate,
    });
    const { data: productData, refetch: refetchProductData } = useReportProduct({
        start_date: startDate,
        end_date: endDate,
    });

    let totalSalesProduct = 0;
    let totalAmount = 0;
    if (salesData) {
        totalAmount = salesData.reduce((acc: any, currentValue: any) => acc + currentValue.totalAmount, 0);
    }
    if (productData) {
        totalSalesProduct = productData.reduce((acc: any, currentValue: any) => acc + currentValue.count, 0);
    }

    useEffect(() => {
        refetchSalesData();
        refetchProductData();
    }, [startDate, endDate, refetchSalesData, refetchProductData]);

    return (
        <>
            <div className="border-4 rounded-md border-black w-[307px]">
                <FilterDateReport start_date={startDate} end_date={endDate} />
            </div>
            <div className="flex flex-col justify-between space-y-16">
                <div className="flex flex-col ">
                    <h2 className="flex gap-2 text-3xl font-bold tracking-tight"></h2>
                    <div className="flex  gap-2 mb-7">
                        <div className="w-[250px] border-4 border-gray-700 rounded-md p-4 space-y-4">
                            <div className="flex justify-between font-semibold">
                                <span>Total Revenue</span>
                                <span>
                                    <Banknote />
                                </span>
                            </div>
                            <div className="font-semibold">{formatToRupiah(Number(totalAmount))}</div>
                        </div>

                        <div className="w-[250px] border-4 border-gray-700 rounded-md p-4 space-y-4">
                            <div className="flex justify-between font-semibold">
                                <span>Total Sales Product</span>
                                <span>
                                    <Barcode />
                                </span>
                            </div>
                            <div className="font-semibold">{totalSalesProduct}</div>
                        </div>
                    </div>
                    <TransactionReport dataSales={salesData} />
                </div>

                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
                            <Package className="w-8 h-8" />
                            {`Sales By Products`}
                        </h2>
                        <ProductReport dataProduct={productData} />
                    </div>
                </div>
            </div>
        </>
    );
}
