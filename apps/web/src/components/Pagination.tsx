import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: any;
    totalPages: any;
    onPageChange: any;
}) => {
    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex  mt-4 text-white font-semibold">
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
                        <span className="border rounded px-2 w-8 text-center">{currentPage}</span>
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
