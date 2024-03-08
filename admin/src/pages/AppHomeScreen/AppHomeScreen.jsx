import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    asyncapphomescreenUpdateThunk,
    asyncapphomescreenViewThunk
} from '../../redux/thunk/apphomescreen.thunk'
import TableImage from '../../assets/images/user.png'
import './AppHomeScreen.scss'
import LoaderBtn from '../../components/common/LoaderBtn'
// import EmptyImage from '../../assets/images/empty-image.png'

function showImag(imgUrl) {
    if (imgUrl) {
        if (typeof imgUrl === 'string') {
            return imgUrl
        } else {
            return URL.createObjectURL(imgUrl?.[0])
        }
    }
}

const AppHomeScreen = () => {
    const [uploadmediatype, setuploadmediatype] = useState('')

    //#region AppHomeScreen Validation Schema
    const validationSchema = yup.object({
        // tips: yup.string().required('Please enter tips').trim(),
        // tipsDe: yup.string().required('Please enter tip in german').trim(),
        title: yup.string().required('Please enter title').trim(),
        description: yup.string().required('Please enter description').trim(),
        titleDe: yup.string().required('Please enter title in german').trim(),
        descriptionDe: yup
            .string()
            .required('Please enter description in german')
            .trim(),
        url: yup.string().url('Please enter valid url'),
        blogImage: yup
            .mixed()
            .test('type', 'Accepted image formats', (value) => {
                if (typeof value === 'string') {
                    return true
                }
                return !value || (value && value[0].type.startsWith('image/'))
            })
    })
    //#endregion

    const dispatch = useDispatch()
    const { apphomescreen, isLoading } = useSelector((e) => e?.apphomescreen)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch
    } = useForm({
        resolver: yupResolver(validationSchema),
        shouldUnregister: true
    })

    useEffect(() => {
        if (apphomescreen) {
            reset({
                // tips: apphomescreen?.data?.tips,
                // tipsDe: apphomescreen?.data?.tipsDe,
                title: apphomescreen?.data?.title,
                description: apphomescreen?.data?.description,
                titleDe: apphomescreen?.data?.titleDe,
                descriptionDe: apphomescreen?.data?.descriptionDe,
                uploadType: apphomescreen?.data?.uploadType,
                url: apphomescreen?.data?.url,
                blogImage: apphomescreen?.data?.blogImage
            })
            setuploadmediatype(apphomescreen?.data?.uploadType)
        }
    }, [apphomescreen])

    useEffect(() => {
        dispatch(asyncapphomescreenViewThunk())
    }, [])

    //#region Handle Form Data Button
    function handleAppHomeScreen(data) {
        const formdata = new FormData()
        // formdata.append('tips', data?.tips)
        // formdata.append('tipsDe', data?.tipsDe)
        formdata.append('title', data?.title)
        formdata.append('titleDe', data?.titleDe)
        formdata.append('description', data?.description)
        formdata.append('descriptionDe', data?.descriptionDe)
        formdata.append('uploadType', uploadmediatype)

        if (uploadmediatype === 'image') {
            formdata.append('blogImage',typeof data?.blogImage=="object" ? data?.blogImage[0] :data?.blogImage )
            formdata.delete('url')
        } else if (uploadmediatype === 'video') {
            formdata.append('url', data?.url)
            formdata.delete('blogImage')
        }

        dispatch(asyncapphomescreenUpdateThunk(formdata))
    }
    //#endregion

    const handleUploadType = (e) => {
        setuploadmediatype(e.target.value)
    }

    return (
        <div className="app-homescreen-page account-common-details">
            <form
                onSubmit={handleSubmit(handleAppHomeScreen)}
                encType="multipart/form-data"
            >
                <div className="account-title">
                    <h2>App Home Screen</h2>
                </div>
                <div className="form-content mt-32">
                    {/* <div className="input-group w-full">
                        <label htmlFor="tips">Tips</label>
                        <textarea
                            name="tips"
                            id="tips"
                            rows="3"
                            {...register('tips')}
                        ></textarea>
                        {errors?.tips?.message && (
                            <span className="error-msg">
                                {errors?.tips?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="tips">Tips in German</label>
                        <textarea
                            name="tipsDe"
                            id="tips"
                            rows="3"
                            {...register('tipsDe')}
                        ></textarea>
                        {errors?.tipsDe?.message && (
                            <span className="error-msg">
                                {errors?.tipsDe?.message}
                            </span>
                        )}
                    </div> */}
                    <div className="account-title">
                        <h2>Blog Details</h2>
                    </div>
                    
                    <div className="input-group w-full">
                        <label htmlFor="blog-title">Blog Title</label>
                        <input
                            type="text"
                            id="blog-title"
                            name="title"
                            {...register('title')}
                        />
                        {errors?.title?.message && (
                            <span className="error-msg">
                                {errors?.title?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="blog-title">Blog Title in German</label>
                        <input
                            type="text"
                            id="blog-title"
                            name="titleDe"
                            {...register('titleDe')}
                        />
                        {errors?.titleDe?.message && (
                            <span className="error-msg">
                                {errors?.titleDe?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="blog-description">
                            Blog Description
                        </label>
                        <textarea
                            name="description"
                            id="blog-description"
                            rows="3"
                            {...register('description')}
                        ></textarea>
                        {errors?.description?.message && (
                            <span className="error-msg">
                                {errors?.description?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="blog-description">
                            Blog Description in German
                        </label>
                        <textarea
                            name="descriptionDe"
                            id="blog-description"
                            rows="3"
                            {...register('descriptionDe')}
                        ></textarea>
                        {errors?.descriptionDe?.message && (
                            <span className="error-msg">
                                {errors?.descriptionDe?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="upload-img-video">
                            Upload Image or video
                        </label>
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                            <div className="custom-radio sm:w-1/2">
                                <input
                                    type="radio"
                                    id="image"
                                    name="uploadType"
                                    value="image"
                                    onChange={handleUploadType}
                                    checked={
                                        uploadmediatype === 'image'
                                            ? true
                                            : false
                                    }
                                />
                                <label htmlFor="image">Image</label>
                            </div>
                            <div className="custom-radio  sm:w-1/2">
                                <input
                                    type="radio"
                                    id="video"
                                    name="uploadType"
                                    value="video"
                                    onChange={handleUploadType}
                                    checked={
                                        uploadmediatype === 'video'
                                            ? true
                                            : false
                                    }
                                />
                                <label htmlFor="video">Video</label>
                            </div>
                        </div>
                    </div>
                    <div className="input-group w-full">
                        {uploadmediatype == 'video' ? (
                            <>
                                <label htmlFor="blog-title">Blog Video</label>
                                <input
                                    type="text"
                                    id="url"
                                    name="url"
                                    {...register('url')}
                                />
                                {errors?.url?.message && (
                                    <span className="error-msg">
                                        {errors?.url?.message}
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                            <div className='sm:w-1/2'>
                                <label htmlFor="blog-title">
                                    Blog Image
                                </label>
                                <div className="uploaded-image-video">
                                    <div className="profileUploadwrap">
                                        <label
                                            htmlFor="blogImage"
                                            className="profileUpload"
                                        >
                                            <Controller
                                                control={control}
                                                name="blogImage"
                                                render={({
                                                    field: { onChange }
                                                }) => {
                                                    return (
                                                        <input
                                                            accept="image/png,image/jpg,image/jpeg"
                                                            type="file"
                                                            name="blogImage"
                                                            id="blogImage"
                                                            hidden
                                                            onChange={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    e.target?.accept
                                                                        ?.split(
                                                                            ','
                                                                        )
                                                                        .includes(
                                                                            e
                                                                                .target
                                                                                .files?.[0]
                                                                                .type
                                                                        )
                                                                ) {
                                                                    onChange(
                                                                        e
                                                                            .target
                                                                            .files
                                                                    )
                                                                } else {
                                                                    Swal.fire(
                                                                        {
                                                                            text: imagevalid,
                                                                            icon: 'warning'
                                                                        }
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )
                                                }}
                                            />
                                            
                                            <span className="block w-full upload-blog-image">
                                                <img
                                                    // onError={(e) => {
                                                    //     e.target.src ='../../assets/images/empty-image.png'
                                                    // }}
                                                    src={
                                                        showImag(
                                                            watch(
                                                                'blogImage'
                                                            )
                                                        ) 
                                                    }
                                                    width=""
                                                    height=""
                                                    alt="Blog Image"
                                                />
                                            </span>
                                        </label>
                                        <span className='flex items-center justify-center upload-btn'><i className='icon-edit'></i></span>
                                    </div>
                                    {errors?.blogImage?.message && (
                                        <span style={{ color: 'red' }}>
                                            {errors?.blogImage?.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                    <button className="solid-btn dashboard-form-btn">
                        {isLoading ? <LoaderBtn /> : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AppHomeScreen
