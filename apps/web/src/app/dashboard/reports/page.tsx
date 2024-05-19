'use client';
import { format, addDays } from 'date-fns';
import SalesReportDashboard from './_component/SalesReportDashboard';

const ReportDashboard = ({
    searchParams,
}: {
    searchParams?: {
        start_date?: string;
        end_date?: string;
    };
}) => {
    const now = new Date();
    const startDate = searchParams?.start_date || format(addDays(now, -6), 'yyyy-MM-dd');
    const endDate = searchParams?.end_date || format(now, 'yyyy-MM-dd');

    return (
        <div className=" w-full h-full flex-1 flex-col space-y-2 p-10 md:flex">
            <SalesReportDashboard startDate={startDate} endDate={endDate} />
        </div>
    );
};

export default ReportDashboard;
