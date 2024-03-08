import React from "react";
import Select from 'react-select'
import "./ReactSelect.scss";

const SelectCustom = ({
  openMenuOnFocus,
  value,
  onChange,
  onInputChange,
  getOptionLabel,
  getOptionValue,
  options,
  isSearchable,
  className,
  isClearable,
  isMulti,
  ...rest
}) => {


    const colourStyles = {
        option: (
            styles,
            { data, isDisabled, isFocused, isSelected, ...rest }
        ) => {
            return {
                ...styles,
                backgroundColor: isSelected ? '#B09684' : isFocused ? "#d5b29bc2": 'white',
                color: isSelected ?  'white' : isFocused ? "white": 'black',
                cursor: 'pointer',
                zIndex : "2",
                ':active': {
                    backgroundColor: '#B09684',
                    color: 'white'
                },
            }
        }
    }

    console.log('isMulti',isMulti)
  return (
    <>
      <Select
        // menuIsOpen={true}
        isMulti={isMulti}
        openMenuOnFocus={openMenuOnFocus}
        value={value}
        onChange={onChange}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={options}
        isSearchable={isSearchable}
        {...rest}
        styles={colourStyles}
        isClearable ={isClearable}
        className={`react-select-menu ${isMulti ? "multi-select-menu" : ""} ${className}`}
      />
    </>
  );
};

export default SelectCustom;
