import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { SearchBar } from './SearchBar';
import "./styles/NavbarComponent.css"
import { Login } from '../pages/LoginPage/Login';

export const NavbarComponent = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ConnectProfiles</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="navbar-collapse-custom">
        <SearchBar />
        <Button>Search</Button>
        <Button onClick={() => setOpenModal(true)}>Sign In</Button>
        <Login openModal={openModal} setOpenModal={setOpenModal} />
      </Navbar.Collapse>
    </Navbar>
  );
};
