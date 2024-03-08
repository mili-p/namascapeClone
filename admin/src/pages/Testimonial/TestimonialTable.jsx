import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import DeleteLogoutModal from "../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import ProfileImage from '../../assets/images/user.png'
import { addtestimonial, viewtestimonial } from '../../config/routeConsts'

const TestimonialTable = () => {
  const [Dropdown, setDropdown] = useState(false);
  const OpenDropdown = () => {
    setDropdown(!Dropdown);
  };
  const [show, setshow] = useState(false)
  const openMobileMenu = () =>{
    setshow(true);
    document.body.classList.add('open-menu');
  }
  const item = [
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
    {
      Name:'Anna.W',
      Type:'Event Organizer',
    },
  ];

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row?.Image, {
      id: "Image",
      header: () => <>Image</>,
      cell: (row) => {
          return (
              <>
                  <img
                      src={ProfileImage}
                      alt="event-image"
                  />
              </>
          )
      }
    }),
    columnHelper.accessor((row) => row?.Name, {
      id: "Name",
      header: () => <>Name</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.Type, {
      id: "Type",
      header: () => <>Type</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.Description, {
      id: "Description",
      header: () => <>Description</>,
      cell: () => {
        return (
          <>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </>
        )
      },
    }),
    columnHelper.accessor((row) => row?.actions, {
      id: "actions",
      header: () => <>Actions</>,
      cell: (e) => {
        return (
          <>
            <div className="custom-table-dropdown">
              <button
                type="button"
                className={`text-center btn-toggle ${
                  Dropdown === true ? "active" : ""
                }`}
                onClick={OpenDropdown}
              >
                <i className="icon-dots"></i>
              </button>
              <ul
                className={`dropdown-body ${Dropdown === true ? "show" : ""}`}
              >
                <li>
                  <Link to={viewtestimonial} className="flex items-center link">
                    <i className="icon-eye-open"></i> View
                  </Link>
                </li>
                <li>
                  <Link to={addtestimonial} className="flex items-center link">
                    <i className="icon-edit"></i> Edit
                  </Link>
                </li>
                <li>
                  <div className="flex items-center link" onClick={openMobileMenu}>
                    <i className="icon-delete"></i> Delete
                  </div>
                </li>
              </ul>
            </div>
          </>
        );
      },
    }),
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

export default TestimonialTable