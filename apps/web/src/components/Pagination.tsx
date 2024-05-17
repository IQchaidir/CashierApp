import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}: {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            const params = new URLSearchParams(searchParams);
            if (page > 1) {
                params.set('page', page.toString());
            } else {
                params.delete('page');
            }
            router.replace(`${pathname}?${params.toString()}`);
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex mt-4 text-black font-semibold">
            <nav>
                <ul className="pagination flex gap-4">
                    <li className="page-item">
                        <button
                            className="page-link flex"
                            onClick={() => handleClick(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft /> Previous
                        </button>
                    </li>
                    <div className="flex items-center w-20 gap-2">
                        <span className="border border-black rounded px-2 w-8 text-center">{currentPage}</span>
                        <span>of</span>
                        {totalPages}
                    </div>
                    <li className="page-item">
                        <button
                            className="page-link flex"
                            onClick={() => handleClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
