import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { addediteventcategory, addtestimonial, eventcategorydetails, viewtestimonial } from '../../config/routeConsts'
import ProfileImage from '../../assets/images/user.png'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import DeleteLogoutModal from "../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";


const EventCategoryTable = () => {
  
  
  const [Dropdown, setDropdown] = useState(null)
  const OpenDropdown = (id) => {
      setDropdown(Dropdown === id ? null : id)
  }

  const [show, setshow] = useState(false)
  const openMobileMenu = () =>{
    setshow(true);
    document.body.classList.add('open-menu');
  }
  const item = [
    {
      eventcategoryId:1,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
    {
      eventcategoryId:2,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
    {
      eventcategoryId:3,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
    {
      eventcategoryId:4,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
    {
      eventcategoryId:5,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
    {
      eventcategoryId:6,
      Name:'Anna.W',
      Type:'Event Organizer',
      createdAt:'1703263339654'
    },
  ];

  const columnHelper = createColumnHelper();
  const columns = [
    
    columnHelper.accessor((row) => row?.Name, {
      id: "Name",
      header: () => <>Name</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.createdAt, {
      id: "createdAt",
      header: () => <>Created Date</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    
    columnHelper.accessor((row) => row?.actions, {
      id: 'actions',
      header: () => <>Action</>,
      cell: (row) => {
          return (
              <>
                  <div className="custom-table-dropdown" onMouseLeave={()=>OpenDropdown("")}>
                      <button
                          type="button"
                          className={`text-center btn-toggle ${
                              row?.row?.original?.eventcategoryId === Dropdown
                                  ? 'active'
                                  : ''
                          }`}
                          onClick={() =>
                              OpenDropdown(row?.row?.original?.eventcategoryId)
                          }

                      >
                          <i className="icon-dots"></i>
                      </button>
                      <ul
                          className={`dropdown-body ${
                              row?.row?.original?.eventcategoryId === Dropdown
                                  ? 'show'
                                  : ''
                          }`}
                      >
                          <li>
                              <Link
                                  to={`${eventcategorydetails}/${row?.row?.original?.eventcategoryId}`}
                                  className="flex items-center link"
                              >
                                  <i className="icon-eye-open"></i> View
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to={`${addediteventcategory}/${row?.row?.original?.eventcategoryId}`}
                                  className="flex items-center link"
                              >
                                  <i className="icon-edit"></i> Edit
                              </Link>
                          </li>
                          <li>
                              <div
                                  className="flex items-center link"
                                  onClick={() => {
                                      openMobileMenu()
                                      user.current =
                                          row?.row?.original?.eventcategoryId
                                  }}
                              >
                                  <i className="icon-delete"></i> Delete
                              </div>
                          </li>
                      </ul>
                  </div>
              </>
          )
      }
  })
    ,
  ];

  return (
    <>
      <ReactTableList columns={columns} data={item} />
      <Pagination
        totalCount={"20"}
        activePage={"1"}
        pageCount={Math.ceil(20 / 10)}
      />
      <DeleteLogoutModal
        show={show}
        setshow={setshow}
        title={<>are you sure you want to delete this testimonial</>}
        IconClass={'icon-delete'}
        SolidBTNText={'Delete'}
        Delete
      />
    </>
  )
}

export default EventCategoryTable