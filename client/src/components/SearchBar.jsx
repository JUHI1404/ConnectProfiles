import React, { useContext, useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { SearchContext } from '../context/SearchContext';

export const SearchBar = () => {
  const { setSearchQuery } = useContext(SearchContext);
  const [query, setQuery] = useState('');

  const onSearchClick = () => {
      setSearchQuery(query);
  };

  return (
    <div className="flex items-center max-w-md gap-4">
      <TextInput id="search" type="text" rightIcon={MdOutlinePersonSearch } placeholder="Search profiles..." value={query} onChange={(e) => {
          setQuery(e.target.value)
        }}  />
                  <Button onClick={onSearchClick}>Search</Button>
    </div>
  )
}
