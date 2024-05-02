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
    const { searchQuery } = useContext(SearchContext);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                console.log('searchQuery', searchQuery);
                const url = searchQuery ? `/user/search?query=${searchQuery}` : '/user/';
                const response = await apiRequest.get(url);
                setProfiles(response.data);
            } catch (err) {
                console.error('Error fetching profiles:', err);
                toast.error('Error fetching profiles: ' + err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, [searchQuery]);

    const handleProfileClick = (id) => {
        setExpandedProfileId(expandedProfileId === id ? null : id);
    };

    return (
        <div className="flex flex-col items-center">
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Spinner aria-label="Loading" />
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    {profiles.map((profile) => (
                        <Card
                            key={profile.id}
                            className="mb-4 w-full lg:w-2/3 relative shadow-md rounded-lg p-4"
                            style={{ border: '1px solid #e2e8f0' }}
                        >
                            <div className="flex items-center justify-between">
                                <img
                                    src={profile.avatar || 'https://res.cloudinary.com/dspicjwkq/image/upload/v1714633803/avatars/ipqcc2oqfooliph7fzbb.jpg'}
                                    //alt={`${profile.username}'s avatar`}
                                    className={`rounded-full shadow-md object-cover transition-all duration-300 ease-in-out ${
                                        expandedProfileId === profile.id ? 'w-20 h-20' : 'w-14 h-14'
                                    }`}
                                />
                                <div className="flex-grow ml-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {profile.username}
                                    </h3>
                                    <p className="text-sm text-gray-600">{profile.jobTitle}</p>
                                    <p className="text-sm text-gray-600">{profile.location}</p>
                                </div>
                            </div>

                            {expandedProfileId === profile.id && (
                                <div className="mt-2 text-sm text-gray-700">
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
                        </Card>
                    ))}
                    {profiles.length === 0 && (
                        <Link to="/" className="text-blue-600 mt-4">
                            No profiles found, click here to go back home
                        </Link>
                    )}
                </>
            )}
        </div>
    );
};
