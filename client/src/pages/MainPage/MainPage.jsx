import React, { useContext, useState } from 'react';
import { NavbarComponent } from '../../components/NavbarComponent';
import { AuthContext } from '../../context/AuthContext';
import { ListPage } from '../list/ListPage.jsx';
import { Button } from 'flowbite-react';

export const MainPage = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <NavbarComponent />
            {currentUser ? (
                <ListPage />
            ) : (
                // Landing page content for unauthenticated users
                <div className="flex flex-col items-center justify-center h-screen p-4">
                    <h1 className="text-4xl font-bold mb-4">Let's Get Connected!</h1>
                    <p className="text-xl mb-6">
                        Discover amazing profiles and connect with others.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Button href="/login" className="w-32">
                            Log In
                        </Button>
                        <Button href="/signup" className="w-32" color="primary">
                            Sign Up
                        </Button>
                    </div>
                    <p className="mt-4 text-sm">
                        Explore our app and find interesting profiles.
                    </p>
                </div>
            )}
        </>
    );
};
