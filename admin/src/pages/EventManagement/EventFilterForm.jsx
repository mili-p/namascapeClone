import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from '../../components/SelectCustom/SelectCustom'
import { EVENTSTATUS, EVENTTYPE } from '../../common/constsforCodes'
import { getCityThunk } from '../../redux/thunk/eventThunk/event.thunk'

let timer

//#region Filter Validation Schema
const validationSchema = yup
    .object()
    .shape(
        {
            start_date: yup.string().when('end_date', {
                is: (e) => !!e,
                then: () => yup.string().required('Start date is required'),
                otherwise: () => yup.string()
            }),
            end_date: yup.string().when('start_date', {
                is: (e) => !!e,
                then: () => yup.string().required('End date is required'),
                otherwise: () => yup.string()
            })
        },
        ['start_date', 'end_date']
    )
    .test(
        'custome-message',
        'Start date should  be less than end date',
        function (value) {
            if (Boolean(value?.start_date) && Boolean(value?.end_date)) {
                return new Date(value?.end_date).getTime() >=
                    new Date(value?.start_date).getTime()
                    ? true
                    : false
            } else {
                return true
            }
        }
    )
//#endregion

const EventFilterForm = ({
    getValue,
    filterData,
    setFilterData,
    setFilterModalShow,
    partnerList,
    setPage
}) => {
    const dispatch = useDispatch()
    const [city, setCity] = useState(false)
    const { cityData } = useSelector((e) => e.event)

    const partnerDetails = [
        {
            name: 'AAAAA',
            Id: 1
        },
        {
            name: 'BBBB',
            Id: 2
        },
        {
            name: 'CCCCC',
            Id: 3
        },
        {
            name: 'DDDDD',
            Id: 4
        },
        {
            name: 'EEEEE',
            Id: 5
        },
        {
            name: 'FFFFF',
            Id: 6
        },
    ]

    const handleCityChange = (e) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // onChange(e)
            dispatch(
                getCityThunk({
                    search: e
                })
            )
        }, 500)
    }

    const {
        watch,
        register,
        control,
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
        defaultValues: filterData ? filterData : { sorting: 'Price' }
    })

    const EventPaid = [
        {
            title: 'All',
            id: 1
        },
        {
            title: 'Paid',
            id: 2
        },
        {
            title: 'Free',
            id: 3
        }
    ]

    const SortingByPrice = [
        {
            title: 'All',
            id: 1
        },
        {
            title: 'Low - High',
            id: 2
        },
        {
            title: 'High - Low',
            id: 3
        }
    ]

    const SortingByDate = [
        {
            title: 'Created Date',
            id: 1
        },
        {
            title: 'Updated Date',
            id: 2
        }
    ]

    function onSubmit(data) {
        console.log(data,'data')
        setFilterModalShow(false)
        getValue(data)
        setPage(1)
        localStorage.setItem('currentPage',1)
    }

    return (
        <>
            <div>
                <h2>Filter Experiences</h2>
                <i
                    className="icon-cross"
                    onClick={() => setFilterModalShow(false)}
                ></i>
            </div>
            <form
                className="filter-events-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="filter-events-data">
                    <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
                        <div className="input-group w-full">
                            <label htmlFor="start-date">Start Date</label>
                            <input
                                {...register('start_date')}
                                type="date"
                                labelid="startdate"
                                name="start_date"
                                pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                                // min={
                                //     new Date()
                                //         .toISOString()
                                //         .split('T')[0]
                                // }
                                max="2099-12-31"
                            />
                            {errors?.start_date?.message && (
                                <span className="error-msg">
                                    {errors?.start_date?.message}
                                </span>
                            )}
                            {errors?.['']?.message && (
                                <span className="error-msg">
                                    {errors?.['']?.message}
                                </span>
                            )}
                        </div>
                        <div className="input-group w-full">
                            <label htmlFor="end-date">End Date</label>
                            <input
                                disabled={!watch('start_date')}
                                {...register('end_date')}
                                type="date"
                                labelid="enddate"
                                name="end_date"
                                pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                                // min={
                                //     new Date()
                                //         .toISOString()
                                //         .split('T')[0]
                                // }
                                max="2099-12-31"
                                // min={watch('start_date')}
                                error={errors?.end_date?.message}
                            />
                            {errors?.end_date?.message && (
                                <span className="error-msg">
                                    {errors?.end_date?.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
                        <div className="input-group w-full">
                            <label>Status</label>
                            <Controller
                                control={control}
                                name="EventStatus"
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <SelectCustom
                                            defaultValue={{
                                                id: '',
                                                title: 'All'
                                            }}
                                            openMenuOnFocus={true}
                                            value={value}
                                            className={'event-type-select'}
                                            onChange={onChange}
                                            // onInputChange={(e) => { handleCityChange(e) }}
                                            getOptionLabel={(e) => {
                                                return e.title
                                            }}
                                            getOptionValue={(e) => {
                                                return e.id
                                            }}
                                            options={[
                                                { id: '', title: 'All' },
                                                ...EVENTSTATUS
                                            ]}
                                            isSearchable={false}
                                        />
                                    )
                                }}
                            />
                            {errors?.EventStatus?.message && (
                                <span className="error-msg">
                                    {errors?.EventStatus?.message}
                                </span>
                            )}
                        </div>

                        <div className="input-group w-full">
                            <label>Experience Price</label>
                            <div
                                className={`custom-select ${
                                    city === true ? 'active' : ''
                                }`}
                            >
                                <Controller
                                    control={control}
                                    name="isPaid"
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <SelectCustom
                                            defaultValue={{
                                                title: 'All',
                                                id: 1
                                            }}
                                            openMenuOnFocus={true}
                                            value={value}
                                            className={'event-type-select'}
                                            onChange={onChange}
                                            getOptionLabel={(e) => {
                                                return e.title
                                            }}
                                            getOptionValue={(e) => {
                                                return e.id
                                            }}
                                            options={EventPaid}
                                            isSearchable={false}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
                        <div className="input-group w-full">
                            <label htmlFor="location">Location</label>
                            <div
                                className={`custom-select ${
                                    city === true ? 'active' : ''
                                }`}
                            >
                                <Controller
                                    control={control}
                                    name="city"
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <SelectCustom
                                            openMenuOnFocus={true}
                                            value={value}
                                            onChange={onChange}
                                            className={'location-select'}
                                            onInputChange={(e) => {
                                                handleCityChange(e)
                                            }}
                                            getOptionLabel={(e) => {
                                                return e.name
                                            }}
                                            getOptionValue={(e) => {
                                                return e.cityId
                                            }}
                                            options={cityData ?? []}
                                            isSearchable={true}
                                            placeholder="Search City"
                                            isClearable
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="input-group w-full">
                            <label>Experience Type</label>
                            <div
                                className={`custom-select ${
                                    city === true ? 'active' : ''
                                }`}
                            >
                                <Controller
                                    control={control}
                                    name="eventType"
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <SelectCustom
                                            // defaultValue={{
                                            //     title: 'All',
                                            //     id: 1
                                            // }}
                                            openMenuOnFocus={true}
                                            value = {value ?? null}
                                            // value={
                                            //     value ?? 
                                            //     {
                                            //         title: 'All',
                                            //         id: 1
                                            //     }
                                            // }
                                            className={'event-type-select'}
                                            onChange = {(e)=>onChange(e)}
                                            // onChange={(e) => {
                                            //     if (e?.id === 1) {
                                            //         onChange(null)
                                            //     } else {
                                            //         onChange(e)
                                            //     }
                                            // }}
                                            getOptionLabel={(e) => {
                                                return e.title
                                            }}
                                            getOptionValue={(e) => {
                                                return e.id
                                            }}
                                            options={EVENTTYPE}
                                            isSearchable={false}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
                        <div className="input-group w-full">
                            <label htmlFor="partners">Partners</label>
                            <div
                                className={`custom-select ${
                                    city === true ? 'active' : ''
                                }`}
                            >
                                <Controller
                                    control={control}
                                    name="organizerIds"
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <SelectCustom
                                            openMenuOnFocus={true}
                                            value={value}
                                            onChange={onChange}
                                            className={'location-select '}
                                            onInputChange={(e) => {
                                                // handleCityChange(e)
                                                console.log(e,'e')
                                            }}
                                            getOptionLabel={(e) => {
                                                return e.userName
                                            }}
                                            getOptionValue={(e) => {
                                                return e.userId
                                            }}
                                            options={partnerList ?? []}
                                            isSearchable={true}
                                            placeholder="Search Partners"
                                            isClearable
                                            isMulti
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
                        <div className="input-group w-full">
                            <label>Sorting By</label>
                            <div className="flex items-center gap-4 2xl:gap-5">
                                <div className="custom-radio flex items-center w-full">
                                    <Controller
                                        name="sorting"
                                        control={control}
                                        defaultValue="price"
                                        render={({
                                            field: { onChange, value }
                                        }) => (
                                            <>
                                                <input
                                                    checked={value === 'Price'}
                                                    id="Price"
                                                    type="radio"
                                                    value="Price"
                                                    onChange={(e) =>
                                                        {
                                                            onChange(e.target.value)
                                                            setValue('sortbydate','')
                                                        }
                                                    }
                                                />
                                                <label htmlFor="Price">
                                                    Price
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className='custom-radio flex items-center w-full'>
                                    <Controller
                                        name='sorting'
                                        control={control}
                                        // defaultValue='time'
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <input
                                                    checked={value==="Date"}
                                                    id='Date'
                                                    type='radio'
                                                    value='Date'
                                                    onChange={(e) => {
                                                            onChange( e.target.value)
                                                            setValue('sortbyprice','')
                                                        }
                                                    }
                                                />
                                                <label htmlFor='Date'>Date</label>
                                            </>
                                        )}
                                    />
                                </div>
                                {/* <div className='custom-radio flex items-center w-1/2'>
                                    <Controller
                                        name='sorting'
                                        control={control}
                                        // defaultValue='time'
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <input
                                                   checked={value==="Date"}
                                                    id='Date'
                                                    type='radio'
                                                    value='Date'
                                                    onChange={(e) => onChange( e.target.value)}
                                                />
                                                <label htmlFor='Date'>Date</label>
                                            </>
                                        )}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='xl:flex xl:items-center xl:gap-4 2xl:gap-5'>
                    {watch('sorting') === 'Price' && (
                                    <div className="input-group w-full">
                                        <label>Sorting By Price</label>
                                        <div
                                            className={`custom-select ${
                                                city === true ? 'active' : ''
                                            }`}
                                        >
                                            <Controller
                                                control={control}
                                                name="sortbyprice"
                                                render={({
                                                    field: { onChange, value }
                                                }) => (
                                                    <SelectCustom
                                                        // defaultValue={{
                                                        //     title: 'All',
                                                        //     id: 1
                                                        // }}
                                                        openMenuOnFocus={true}
                                                        placeholder={
                                                            'Select Value For Price'
                                                        }
                                                        value={value}
                                                        className={
                                                            'event-type-select'
                                                        }
                                                        onChange={(e) => {
                                                            onChange(e)
                                                        }}
                                                        getOptionLabel={(e) => {
                                                            return e.title
                                                        }}
                                                        getOptionValue={(e) => {
                                                            return e.id
                                                        }}
                                                        options={SortingByPrice}
                                                        isSearchable={false}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                                {watch('sorting') === 'Date' && (
                                    <div className="input-group w-full">
                                        <label>Sorting By Date</label>
                                        <div
                                            className={`custom-select ${
                                                city === true ? 'active' : ''
                                            }`}
                                        >
                                            <Controller
                                                control={control}
                                                name="sortbydate"
                                                render={({
                                                    field: { onChange, value }
                                                }) => (
                                                    <SelectCustom
                                                        // defaultValue={{
                                                        //     title: 'All',
                                                        //     id: 1
                                                        // }}
                                                        openMenuOnFocus={true}
                                                        value={value ?? null}
                                                        placeholder={
                                                            'Select Sorting Value For Date'
                                                        }
                                                        className={
                                                            'event-type-select'
                                                        }
                                                        onChange={(e) => {
                                                            onChange(e)
                                                        }}
                                                        getOptionLabel={(e) => {
                                                            return e.title
                                                        }}
                                                        getOptionValue={(e) => {
                                                            return e.id
                                                        }}
                                                        options={SortingByDate}
                                                        isSearchable={false}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                    </div>
                </div>
                <div className="flex items-center justify-center modal-btn-group">
                    <button
                        type="button"
                        className="border-btn action-btn"
                        onClick={() => {
                            setFilterModalShow(false)
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="solid-btn action-btn">
                        Apply
                    </button>
                </div>
            </form>
        </>
    )
}

export default EventFilterForm
