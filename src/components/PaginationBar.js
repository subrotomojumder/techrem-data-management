import ResponsivePagination from 'react-responsive-pagination';
import '../styles/pagination.css';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function PaginationBar({ totalDataLength, setStockLimit, stockLimit, currentPage, setCurrentPage }) {
    let totalPages = Math.ceil(Number(totalDataLength) / stockLimit);

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    return (
        <div className='flex justify-start items-center gap-2 my-2'>
            <div className='w-[150px] flex justify-start items-center gap-1'>
                <label htmlFor="perpage" className='whitespace text-sm font-semibold'>Per Page:</label>
                <select onChange={(e) => {
                    setCurrentPage(1);
                    setStockLimit(Number(e.target.value));
                }}
                    className='w-fit font-semibold bg-white rounded border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-1 text-center leading-8 transition-colors duration-200 ease-in-out'
                    id="perpage"
                >
                    <option className='bg-gray-50' value={15}>15</option>
                    <option className='bg-gray-50' value={20} selected>20</option>
                    <option className='bg-gray-50' value={30}>30</option>
                    <option className='bg-gray-50' value={50}>50</option>
                    <option className='bg-gray-50' value={100}>100</option>
                    <option className='bg-gray-50' value={150}>150</option>
                </select>
            </div>
            <div className='flex-1'>
                <ResponsivePagination
                    total={totalPages}
                    current={currentPage}
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
        </div>
    );
}