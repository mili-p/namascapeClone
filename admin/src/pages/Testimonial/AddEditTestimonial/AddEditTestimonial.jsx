import React from 'react'
import { home, testimonial } from '../../../config/routeConsts';
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb';
import ProfileImage from '../../../assets/images/user.png'

const AddEditTestimonial = () => {
    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Testimonial Management",
            url: testimonial,
        },
        {
            title: "Add/Edit Testimonial",
        }
    ];
  return (
   <>
    <div className='add-edit-testimonial'>
        <SiteBreadcrumb
            BreadcrumbData={BreadcrumbData}
            className="protected-breadcrumb"
        />
        <form action="">
            <div className="protected-head">
                <h2>Add/Edit Discount Code</h2>
                <button className="solid-btn dashboard-form-btn">
                    Save
                </button>
            </div>
            <div className="account-details bg-white w-full mt-32">
                <div className="personal-details-page account-common-details">
                    <div className="user-profile flex items-center justify-center flex-col">
                        <div className="users-image">
                            <img
                                // onError={(e) => {
                                //     e.target.src = MyAccountUserImage
                                // }}
                                // src={
                                //     showImag(watch('profile')) ??
                                //     MyAccountUserImage
                                // }
                                src={ProfileImage}
                                width={160}
                                height={160}
                                alt="Profile Image"
                            />
                            <button
                                type="button"
                                className="edit-profile flex items-center justify-center"
                            >
                                {/* <Controller
                                    control={control}
                                    name="profile"
                                    render={({ field: { onChange } }) => {
                                        return ( */}
                                            <input
                                                accept="image/png,image/jpg,image/jpeg"
                                                type="file"
                                                name="profile"
                                                id="profile"
                                                onChange={(e) => {
                                                    if (
                                                        e.target?.accept
                                                            ?.split(',')
                                                            .includes(
                                                                e.target
                                                                    .files?.[0]
                                                                    .type
                                                            )
                                                    ) {
                                                        onChange(
                                                            e.target.files
                                                        )
                                                    } else {
                                                        Swal.fire({
                                                            text: imagevalid,
                                                            icon: 'warning'
                                                        })
                                                    }
                                                }}
                                            />
                                        {/* )
                                    }}
                                /> */}
                                <i className="icon-edit"></i>
                            </button>
                        </div>
                        {/* {errors?.profile?.message && (
                            <span className="error-msg">
                                {errors?.profile?.message}
                            </span>
                        )} */}
                    </div>
                    <div className="form-content mt-32">
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                            <div className="input-group w-full">
                                <label htmlFor="Name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="Name"
                                    // {...register('firstName')}
                                />
                                {/* {errors?.firstName?.message && (
                                    <span className="error-msg">
                                        {errors?.firstName?.message}
                                    </span>
                                )} */}
                            </div>
                            <div className="input-group w-full">
                                <label htmlFor="Type">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="Type"
                                    // {...register('lastName')}
                                />
                                {/* {errors?.lastName?.message && (
                                    <span className="error-msg">
                                        {errors?.lastName?.message}
                                    </span>
                                )} */}
                            </div>
                        </div>
                        <div className="input-group w-full">
                            <label htmlFor="Description">Description</label>
                            <textarea name="" id="" cols="30" rows="5"></textarea>
                            {/* {errors?.email?.message && (
                                <span className="error-msg">
                                    {errors?.email?.message}
                                </span>
                            )} */}
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