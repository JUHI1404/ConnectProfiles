import React, { useContext, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { SearchBar } from './SearchBar';
import './styles/NavbarComponent.css';
import { Login } from '../pages/LoginPage/Login';
import { AuthContext } from '../context/AuthContext';

export const NavbarComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ConnectProfiles</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={currentUser.name}
                img={currentUser.avatar || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.name}</span>
              <span className="block truncate text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
            {/* Add more dropdown items as needed */}
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Navbar.Toggle />
        )}
      </div>
      <Navbar.Collapse className="navbar-collapse-custom">
        {currentUser ? (
          <>
          <SearchBar />
          <Button href="/search">Search</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setOpenModal(true)}>Sign In</Button>
            <Button href="/signup">Sign Up</Button>
          </>
        )}
        <Login openModal={openModal} setOpenModal={setOpenModal} />
      </Navbar.Collapse>
    </Navbar>
  );
};
