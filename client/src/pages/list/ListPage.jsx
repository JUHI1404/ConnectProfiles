import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Spinner } from 'flowbite-react';
import apiRequest from '../../lib/apiRequest';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SearchContext } from '../../context/SearchContext';

export const ListPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [expandedProfileId, setExpandedProfileId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {searchQuery} = useContext(SearchContext)
    // Fetch profiles when the component mounts
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                console.log('searchQuery', searchQuery)
                const url = searchQuery ? `/user/search?query=${searchQuery}` : '/user/';
                const response = await apiRequest.get(url);
                setProfiles(response.data);
            } catch (err) {
                console.error('Error fetching profiles:', err);
                toast.error('Error fetching profiles:' + err.message)
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, [searchQuery]);

    // Handle profile card click
    const handleProfileClick = (id) => {
        if (expandedProfileId === id) {
            // If the profile is already expanded, collapse it
            setExpandedProfileId(null);
        } else {
            // Expand the selected profile
            setExpandedProfileId(id);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {isLoading ? (
                // Display a loading indicator if profiles are being fetched
                <div className="flex items-center gap-2">
                    <Spinner aria-label="Loading" />
                    <span>Loading...</span>
                </div>
            ) : (
                
                <>
                {profiles.map((profile) => (
                    <Card key={profile.id} className="mb-4 w-3/4">
                        <div>
                            <h3 className="text-lg font-bold">{profile.username}</h3>
                            <p>{profile.jobTitle}</p>
                            <p>{profile.location}</p>

                            {expandedProfileId === profile.id && (
                                <div className="mt-2">
                                    <p><strong>Email:</strong> {profile.email}</p>
                                    <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                                    <p><strong>Short Bio:</strong> {profile.shortBio}</p>
                                </div>
                            )}
                            <Button
                                onClick={() => handleProfileClick(profile.id)}
                                className="mt-2"
                            >
                                {expandedProfileId === profile.id ? "Show Less" : "Show More"}
                            </Button>
                        </div>
                    </Card>
                ))}
                {profiles.length === 0 && <a style={{color:'blue'}} href='/'>No profiles found, click here to go back home</a>}
                </>
            )}
        </div>
    );
  }