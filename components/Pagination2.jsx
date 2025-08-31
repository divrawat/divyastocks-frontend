// components/Pagination.js
import Link from 'next/link';

const Pagination2 = ({ currentPage, totalPages, onPageChange, basePath = "" }) => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Create page URL
    const createPageUrl = (page) => {
        if (page === 1) return basePath;
        return `${basePath}?page=${page}`;
    };

    return (
        <div className="flex justify-center mt-8 space-x-2">
            {/* Previous Button */}
            <Link
                href={createPageUrl(currentPage - 1)}
                passHref
            >
                <button
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                >
                    Previous
                </button>
            </Link>

            {/* Page Number Buttons */}
            {pages.map(page => (
                <Link
                    key={page}
                    href={createPageUrl(page)}
                    passHref
                >
                    <button
                        className={`px-4 py-2 rounded-md ${currentPage === page
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                </Link>
            ))}

            {/* Next Button */}
            <Link
                href={createPageUrl(currentPage + 1)}
                passHref
            >
                <button
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                >
                    Next
                </button>
            </Link>
        </div>
    );
};

export default Pagination2;