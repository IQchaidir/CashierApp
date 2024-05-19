import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function FilterDateReport({
    className,
    start_date,
    end_date,
}: {
    className?: string;
    start_date: any;
    end_date: any;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const initialDate: DateRange = {
        from: start_date,
        to: end_date,
    };
    const [date, setDate] = React.useState<DateRange | undefined>(initialDate);

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (date && date.from && date.to) {
            const formattedStartDate = format(date.from, 'yyyy-MM-dd');
            const formattedEndDate = format(date.to, 'yyyy-MM-dd');
            params.set('start_date', formattedStartDate);
            params.set('end_date', formattedEndDate);
            params.delete('page');
        } else {
            params.delete('start_date');
            params.delete('end_date');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [date, pathname, router, searchParams]);

    const handleReset = async () => {
        setDate(undefined);
    };

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[177px] md:w-[300px] text-[11px] md:text-base justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon className="hidden md:flex h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pilih Tanggal</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" w-auto  p-0" align="start">
                    <div className="p-2">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleReset} className=" text-xs md:text-base">
                                Reset
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
