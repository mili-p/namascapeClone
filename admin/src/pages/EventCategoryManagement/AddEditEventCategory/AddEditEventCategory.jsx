import React from 'react'
import { home, testimonial } from '../../../config/routeConsts';
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb';
import ProfileImage from '../../../assets/images/user.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const EventCategorySchema=yup.object().shape({
    categoryName: yup.string().required('Please enter category name')
})

const AddEditTestimonial = () => {

    const { eventcategoryId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register,handleSubmit, formState:{errors},watch} = useForm({ resolver: yupResolver(EventCategorySchema) })

    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Event Category Management",
            url: testimonial,
        },
        {
            title:<> {`${eventcategoryId ? "Edit" : "Add"} Category`}</>,
        }
    ];

    const handleEventCategory=(data)=>{
                console.log(data)
    }
  return (
   <>
    <div className='add-edit-testimonial'>
        <SiteBreadcrumb
            BreadcrumbData={BreadcrumbData}
            className="protected-breadcrumb"
        />
        <form onSubmit={handleSubmit(handleEventCategory)}>
            <div className="protected-head">
                <h2>{`${eventcategoryId ? "Edit" : "Add"}`} Category</h2>
                <button className="solid-btn dashboard-form-btn">
                    Save
                </button>
            </div>
            <div className="account-details bg-white w-full mt-32">
                <div className="personal-details-page account-common-details">
                    <div className="form-content mt-32">
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                            <div className="input-group w-full">
                                <label htmlFor="Name">
                                   Category Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="Name"
                                     {...register('categoryName')}
                                />
                                {errors?.categoryName?.message && (
                                    <span className="error-msg">
                                        {errors?.categoryName?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
   </>
  )
}

export default AddEditTestimonial