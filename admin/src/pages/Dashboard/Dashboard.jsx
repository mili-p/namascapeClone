import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.scss'
import {
    eventorganizermanagement,
    usermanagement
} from '../../config/routeConsts'
import { useDispatch, useSelector } from 'react-redux'
import { asyncdashboardViewThunk } from '../../redux/thunk/dashboard.thunk'
import { Currency, PARTNERS } from '../../common/constsforCodes'


const Statastics = React.lazy(()=>import('./components/Statastics/Statastics'))
const UpcommingEvents =React.lazy(()=>import('./components/UpcommingEvents/UpcommingEvents'))
const UserListing = React.lazy(()=>import('./components/UserListing/UserListing'))

const Dashboard = () => {
    const { dashboard,isLoading } = useSelector((e) => e.dashboard)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncdashboardViewThunk())
    }, [])


    const currencyCHF = Currency.find(
        (e) => e?.id === dashboard?.meta?.revenueInCHF?.currency
    )
    const currencyUSD = Currency.find(
        (e) => e?.id === dashboard?.meta?.revenueInUSD?.currency
    )
    const currencyEURO = Currency.find(
        (e) => e?.id === dashboard?.meta?.revenueInEUR?.currency
    )

    return (
        <>
            <div className="protected-dashboard">
                <Statastics data={dashboard?.meta} isLoading={isLoading}/>
                <div className="flex items-stretch flex-wrap xl:flex-nowrap mt-32 events-card-wrapper">
                    <div className='w-full xl:w-1/2 '>
                        <div className='bg-white mb-32 events-card statistics-count'>
                            <div class="flex items-center justify-between flex-wrap head">
                                <h2>Gross Revenue By Currency</h2>
                            </div>
                            <ul className='flex items-stretch flex-wrap protected-counter'>
                            <li className='w-1/2 sm:w-1/3'>
                                    <div className='link'>
                                        <h3>{dashboard?.meta?.revenueInCHF?.grossRevenue}</h3>
                                        <p>{currencyCHF?.name}</p>
                                    </div>
                                </li>
                                <li className='w-1/2 sm:w-1/3'>
                                    <div className='link'>
                                        <h3>{dashboard?.meta?.revenueInEUR?.grossRevenue}</h3>
                                        <p>{currencyEURO?.name}</p>
                                    </div>
                                </li>
                                <li className='w-1/2 sm:w-1/3'>
                                    <div className='link'>
                                        <h3>{dashboard?.meta?.revenueInUSD?.grossRevenue}</h3>
                                        <p>{currencyUSD?.name}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <UpcommingEvents data={dashboard?.data?.eventList}  isLoading={isLoading}/>
                    </div>
                    <div className="w-full xl:w-1/2 table-group">
                        <div className="bg-white events-card">
                            <div className="flex items-center justify-between flex-wrap head">
                                <h2>{`recently registered ${PARTNERS}`}</h2>
                                <Link to={eventorganizermanagement}>
                                    See All
                                </Link>
                            </div>
                            <UserListing data={dashboard?.data?.organizerList} 
                                isLoading={isLoading} />
                        </div>
                        <div className="bg-white mt-32 events-card">
                            <div className="flex items-center justify-between flex-wrap head">
                                <h2>recently registered users</h2>
                                <Link to={usermanagement}>See All</Link>
                            </div>
                            <UserListing data={dashboard?.data?.userList}
                                isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
