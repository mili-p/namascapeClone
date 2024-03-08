import ReactPaginate from 'react-paginate'
import './Pagination.scss'
import Skeleton from '../Skeleton'

const Pagination = ({ onPageChange, pageCount, activePage, totalCount,isLoading }) => {
    // useEffect(() => {
    //     sessionStorage.setItem("activePage",activePage)
    // }, [activePage])
    
    return (
        <>
            {isLoading ?
                <> 
                    <div className="custom-pgntion">
                        <Skeleton width={200} height={20}/>
                        <ul className="pagination-wrap">
                            {Array.from({ length: 3 }).map((_, j) => {
                                return (
                                    <>
                                        <li><div className='link skeleton-link'><Skeleton width='100%' height='100%'/></div></li>
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                </>
            :
                <>
                    <div className="custom-pgntion">
                        {/* <p>Showing 1 to 10 of 60 entries</p> */}
                        <p>
                            Showing{' '}
                            {(activePage - 1) * 10 + // DataLimit  -it's state when its come from parent
                                1}{' '}
                            to{' '}
                            {Math.min(
                                activePage * 10, // DataLimit -it's state when its come from parent
                                totalCount
                            )}{' '}
                            of {totalCount} entries
                        </p>
                        <ReactPaginate
                            forcePage={activePage - 1}
                            breakLabel="..."
                            breakLinkClassName="notPointer"
                            className="pagination-wrap"
                            nextLabel=""
                            previousLabel=""
                            onPageChange={(e) => onPageChange(e.selected + 1)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLinkClassName="icon-back"
                            nextLinkClassName="icon-back"
                            renderOnZeroPageCount={null}
                            activeClassName="selected"
                            disabledClassName="disable"
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Pagination
