import React, { useRef, useState } from 'react'
import ReactTableList from '../../../components/Table/ReactTableList'
import { createColumnHelper } from '@tanstack/react-table'
import TableImage from '../../../assets/images/user.png'
import { Link } from 'react-router-dom'
import {userdetails } from '../../../config/routeConsts'
import { asyncUserStatusUpdateThunk } from '../../../redux/thunk/userThunk/user.thunk'
import { asyncdashboardViewThunk } from '../../../redux/thunk/dashboard.thunk'
import { useDispatch } from 'react-redux'
import TableSkeleton from '../../../components/TableSkeleton'
import DeleteLogoutModal from '../../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'

const RecentlyRegisteredUsers = ({data,isLoading}) => {
  const user = useRef(null)
const dispatch = useDispatch()

  const [Dropdown, setDropdown] = useState(null)
  const OpenDropdown = (id) => {
      setDropdown(Dropdown === id ? null : id)
  }

  const [show, setshow] = useState(false)
  const openMobileMenu = () =>{
    setshow(true);
    document.body.classList.add('open-menu');
  }
 
    const columnHelper = createColumnHelper()
    const columns = [

      columnHelper.accessor((row) => row?.profileImage,{
        id: 'profileImage',
        header: () => <>Image</>,
        cell: (row) => {
          return (
            <>
              <img src={row?.row?.original?.profileImage ? row?.row?.original?.profileImage : TableImage} alt='event-image' />
            </>
          )
        }
      }),
  
      columnHelper.accessor((row) => row?.firstName, {
        id: 'firstName',
        header: () => <>First Name</>,
        cell: (info) => {
          return info.getValue()
        }
      }),
      columnHelper.accessor((row) => row?.lastName, {
        id: 'lastName',
        header: () => <>Last Name</>,
        cell: (info) => {
          return info.getValue()
        }
      }),
      columnHelper.accessor((row) => row?.email, {
        id: 'email',
        header: () => <>Email Address</>,
        cell: (info) => {
          return info.getValue()
        }
      }),
      columnHelper.accessor((row) => row?.actions,{
        id: 'actions',
        header: () => <>Actions</>,
        cell: (row) => {
          return (
            <>
              <div className='custom-table-dropdown'>
                <button type="button"
                                className={`text-center btn-toggle ${row?.row?.original?.userId === Dropdown
                                     ? 'active' 
                                     : ''
                                }`}
                                onClick={() =>
                                    OpenDropdown(row?.row?.original?.userId)}>
                                      <i className='icon-dots'></i>
                                      </button>
                                      <ul 
                className={`dropdown-body ${
                  row?.row?.original?.userId === Dropdown ? 'show' : ''
              }`}
                >
                  <li><Link 
                  to={`${userdetails}/${row?.row?.original?.userId}`}
                   className='flex items-center link'><i className='icon-eye-open'></i> View</Link></li>
                  {/* <li><Link to={`${userdetails}/${row?.row?.original?.userId}`} className='flex items-center link'><i className='icon-edit'></i> Edit</Link></li> */}
                  <li><div className='flex items-center link' onClick={()=>{openMobileMenu()
                                            user.current=row?.row?.original?.userId
                                        }}><i className='icon-delete'></i> Delete</div></li>
                </ul>
              </div>
            </>
          )
        }
      })
    ]
  return (
    <>
    {isLoading ? 
        <>
          <TableSkeleton />
        </>
      :
        <>
          <ReactTableList
            columns={columns}
            data={data}
          />
        </>
    }
        <DeleteLogoutModal
         payload={{userId:user.current,status:3}}
         deleteItem={asyncUserStatusUpdateThunk}
         invalidate={()=>{
          dispatch(
            asyncdashboardViewThunk()
          )
      }}
          show={show}
          setshow={setshow}
          title={<>are you sure you want to delete this User?</>}
          IconClass={'icon-delete'}
          SolidBTNText={'Delete'}
          Delete
        />
    </>
  )
}

export default RecentlyRegisteredUsers