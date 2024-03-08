"use client"
import React from "react";
import Select from "react-select";
import "./ReactSelect.scss";
import { useTranslation } from "react-i18next";

const ReactSelectcmp = ({
  openMenuOnFocus,
  defaultValue,
  value,
  onChange,
  onInputChange,
  getOptionLabel,
  getOptionValue,
  options,
  placeholder,
  isSearchable,
  className,
  isClearable,
  ...rest
}) => {
  const {i18n} = useTranslation()
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected, ...rest }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#B09684"
          : isFocused
          ? "#d5b29bc2"
          : "white",
        color: isSelected ? "white" : isFocused ? "white" : "black",
        cursor: "pointer",
        zIndex: "2",
        ":active": {
          backgroundColor: "#B09684",
          color: "white",
        },
      };
    },
  };
  return (
    <>
      <Select
        // menuIsOpen={true}
        openMenuOnFocus={openMenuOnFocus}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={options}
        placeholder={placeholder}
        // defaultInputValue={defaultValue}
        noOptionsMessage={({ inputValue }) => inputValue ? i18n.t(`notfound`) : placeholder}
        isSearchable={isSearchable}
        {...rest}
        styles={colourStyles}
        isClearable={isClearable}
        className={`react-select-menu ${className}`}
      />
    </>
  );
};

export default ReactSelectcmp;
