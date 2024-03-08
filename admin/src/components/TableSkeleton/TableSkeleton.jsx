import React,{useId} from 'react'
import Skeleton from '../Skeleton'
import './TableSkeleton.scss'

const ReactTableListSkeleton = () => {
    const skeletonHeadId = useId()
    const skeletonBodyId = useId()
    const skeletonPaginationId = useId()
  return (
    <>
        <div div className='skeleton-table table-responsive'>
            <table>
                <thead>
                    <tr>
                        <th><Skeleton width={200} height={20}/></th>
                        {Array.from({ length: 6 }).map((_,i) => {
                            return (
                                <React.Fragment key={skeletonHeadId}><th><Skeleton width={200} height={20}/></th></React.Fragment>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }).map((_, i) => {
                        return (
                            <React.Fragment key={skeletonBodyId}>
                                <tr>
                                    <td><span className='flex items-center justify-center '><Skeleton className='circle mx-auto' width={52} height={52}/></span></td>
                                    {Array.from({ length: 6 }).map((_, j) => {
                                        return (
                                            <><td><Skeleton width={200} height={20}/></td></>
                                        );
                                    })}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div className='flex items-center justify-between skeleton-pagination'>
            <Skeleton width={200} height={20} className='text'/>
            <ul className='pgntion-list'>
                {Array.from({ length: 4 }).map((_, j) => {
                    return (
                        <React.Fragment key={skeletonPaginationId}><li><Skeleton width="100%" height='100%'/></li></React.Fragment>
                    );
                })}
            </ul>
        </div>
    </>
  )
}

export default ReactTableListSkeleton