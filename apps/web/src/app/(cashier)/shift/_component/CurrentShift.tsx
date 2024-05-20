import { formatToRupiah } from '@/utils/formatToRupiah';
import { DialogEndShift } from './DialogEndShift';
import DetailCurrentShift from './DetailCurrentShift';

const CurrentShift = (data: any) => {
    return (
        <div className="w-full flex flex-col h-[660px]">
            {data && (
                <div className="w-full justify-between flex flex-grow">
                    <div className="flex flex-col bg-white w-1/2 font-semibold border-r  h-full">
                        <div className="w-full flex justify-center text-white py-5 text-3xl bg-emerald-300">
                            SHIFT AKTIF
                        </div>
                        <div className="flex flex-col p-10 gap-7  text-4xl ">
                            <div>KASIR: {data.data.user.user_name}</div>
                            <div>Waktu mulai: {new Date(data.data.start_time).toLocaleString()}</div>
                            <div>Uang kas diawal: {formatToRupiah(data.data.initial_cash)}</div>
                            <DialogEndShift id={data.data.id} />
                        </div>
                    </div>
                    <DetailCurrentShift data={data} />
                </div>
            )}
        </div>
    );
};

export default CurrentShift;
