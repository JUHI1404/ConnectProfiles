import React from 'react'
import { Label, TextInput } from "flowbite-react";
import { MdOutlinePersonSearch } from "react-icons/md";

export const SearchBar = () => {
  return (
    <div className="max-w-md">
      <TextInput id="email4" type="email" rightIcon={MdOutlinePersonSearch } placeholder="Search profiles..." required />
    </div>
  )
}
