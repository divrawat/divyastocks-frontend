// components/Pagination.js
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages, basePath = "/page" }) => {
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

    return (
        <div className="flex justify-center flex-wrap mt-8 space-x-2">
            {/* Previous Button */}
            <Link
                href={currentPage > 2 ? `${basePath}/${currentPage - 1}` : "/"}
                passHref
            >
                <button
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#ca0a0a] text-white hover:bg-[#0A4158]'
                        }`}
                >
                    Previous
                </button>
            </Link>

            {/* First Page Button (if not in visible range) */}
            {startPage > 1 && (
                <>
                    <Link href="/" passHref>
                        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                            1
                        </button>
                    </Link>
                    {startPage > 2 && (
                        <span className="px-2 py-2">...</span>
                    )}
                </>
            )}

            {/* Page Number Buttons */}
            {pages.map(page => (
                <Link
                    key={page}
                    href={page === 1 ? "/" : `${basePath}/${page}`}
                    passHref
                >
                    <button
                        className={`px-4 py-2 rounded-md ${currentPage === page
                            ? 'bg-[#ca0a0a] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                </Link>
            ))}

            {/* Last Page Button (if not in visible range) */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-2 py-2">...</span>
                    )}
                    <Link href={`${basePath}/${totalPages}`} passHref>
                        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                            {totalPages}
                        </button>
                    </Link>
                </>
            )}

            {/* Next Button */}
            <Link
                href={`${basePath}/${currentPage + 1}`}
                passHref
            >
                <button
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#ca0a0a] text-white hover:bg-[#0A4158]'
                        }`}
                >
                    Next
                </button>
            </Link>
        </div>
    );
};

export default Pagination;