import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const MultiSelect = ({ name, options, defaultText }) => {

    console.log(name,"name");
    
    const{register, handleSubmit, formState:{errors},watch,control} = useForm() 
   
    //#region Custom style for MultiSelect Dropdown
    const colourStyles = {
        option: (
            styles,
            { data, isDisabled, isFocused, isSelected, ...rest }
        ) => {
            return {
                ...styles,
                fontSize: '16px',
                backgroundColor: isFocused ? '#B09684' : 'white',
                color: isFocused ? 'white' : 'black',
                cursor: 'pointer',
                zIndex: '2',

                // background: 'transparent',
                // border: 'none',
                // boxShadow: 'none',
                ':active': {
                    backgroundColor: '#B09684',
                    color: 'white'
                },
                '@media only screen and (min-width: 1200px)': {
                    ...styles['@media only screen and (min-width: 1200px)'],
                    fontSize: '22px'
                }
            }
        }
    }
    //#endregion
    return (
        <div className="input-wrapper">
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                }) => (
                    <Select
                        // menuIsOpen={true}
                        aria-label="Select an option"
                        isMulti
                        value={value}
                        name={name}
                        onChange={onChange}
                        classNamePrefix="multiselect"
                        options={options}
                        styles={{
                            ...colourStyles
                        }}
                        placeholder={
                            <div
                                style={{
                                    fontSize: 'inherit',
                                    color: 'rgb(117, 117, 117)',
                                    fontWeight: 300
                                }}
                            >
                                {defaultText}
                            </div>
                        }
                        className="basic-multi-select select-items form-input"
                        getOptionLabel={(e) => e.title}
                        getOptionValue={(e) => e.title}
                    />
                )}
            />
        </div>
    )
}

export default MultiSelect
