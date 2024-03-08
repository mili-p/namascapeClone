import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import SelectCustom from '../../SelectCustom/SelectCustom'
import { useDispatch } from 'react-redux'
import { asyncEventAcceptDeclineThunk } from '../../../redux/thunk/eventThunk/event.thunk'
import { EVENTSTATUS } from '../../../common/constsforCodes'

const EventStatusModal = ({setEventStatusUpdateModal,eventStatusUpdateModal,invalidate, payload,defaultValue}) => {

    const {register, handleSubmit,control, formState:{errros}} = useForm({
        defaultValues:defaultValue
    })
    const dispatch = useDispatch()
    const handleStatus= (data)=>{
         dispatch(asyncEventAcceptDeclineThunk({...payload,status:data?.eventstatus?.id},invalidate))  
    }

  return (
    <>
        <div className={`site-modal event-status-modal ${eventStatusUpdateModal===true ? "show" : ""}`} >
            <div className='modal-boday'>
                <h2>Update Experience Status</h2>
                <form onSubmit={handleSubmit(handleStatus)} className='event-form'>
                    {/* Event status Update Drodown */}
                    <Controller
                        control={control}
                        name="eventstatus"
                        render={({
                            field: { onChange, value }
                        }) => (
                            <SelectCustom
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
                                options={EVENTSTATUS}
                                isSearchable={false}
                            />
                        )}
                    />

                   {/* End */}
                    <div className='flex items-center justify-center modal-btn-group'>
                        <button type='button' className='border-btn modal-btn' onClick={()=>{setEventStatusUpdateModal(false)}}>Cancel</button>
                        <button className='solid-btn modal-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default EventStatusModal