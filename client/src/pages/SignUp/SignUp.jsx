import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Textarea, FileInput, Spinner } from 'flowbite-react';
import { NavbarComponent } from '../../components/NavbarComponent';
import toast from 'react-hot-toast';
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UploadWidget from '../../components/UploadWidgit/Uploadwidgit';

export const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        jobTitle: '',
        department: '',
        location: '',
        shortBio: '',
        avatar: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email,
                username: currentUser.username,
                phoneNumber: currentUser.phoneNumber,
                jobTitle: currentUser.jobTitle,
                department: currentUser.department,
                location: currentUser.location,
                shortBio: currentUser.shortBio,
                avatar: avatar[0], 
            });
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, avatar: file });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            let res;
            if (currentUser) {
               
                res = await apiRequest.put(`/user/${currentUser.id}`,{ ...formData, avatar: avatar[0]
                });
                toast.success("Profile Updated");
                updateUser(res?.data)
            } else {
                
                res = await apiRequest.post("/auth/register",  {
                    ...formData
                });
                toast.success("Profile Created");
                navigate("/");
            }

            console.log("Response:", res);
        } catch (err) {
            console.log('AxiosError:', err);
            if (err.response) {
                console.log('Response data:', err.response.data);
                console.log('Response status:', err.response.status);
            } else if (err.request) {
                console.log('No response received:', err.request);
            } else {
                console.log('Error:', err.message);
            }
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex justify-center gap-8 p-4">
                <Card className="max-w-sm w-3/4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                            {!currentUser && <div><Label htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                required={!currentUser}
                                value={formData.password}
                                onChange={handleInputChange}
                            /></div>}
                            
                        <div>
                            <Label htmlFor="username" value="Username" />
                            <TextInput
                                id="username"
                                name="username"
                                placeholder="Your username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={!!currentUser} 
                            />
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber" value="Phone Number" />
                            <TextInput
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Your phone number"
                                required
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="jobTitle" value="Job Title" />
                            <TextInput
                                id="jobTitle"
                                name="jobTitle"
                                placeholder="Your job title"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="department" value="Department" />
                            <TextInput
                                id="department"
                                name="department"
                                placeholder="Your department"
                                value={formData.department}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location" value="Location" />
                            <TextInput
                                id="location"
                                name="location"
                                placeholder="Your location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="shortBio" value="Short Bio" />
                            <Textarea
                                id="shortBio"
                                name="shortBio"
                                placeholder="Write a short bio about yourself"
                                value={formData.shortBio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : currentUser ? "Update Profile" : "Sign Up"}
                        </Button>
                    </form>
                    
                    {isLoading && (
                        <div className="flex items-center gap-2 mt-2">
                            <Spinner aria-label="Loading" />
                            <span>Loading...</span>
                        </div>
                    )}
                </Card>
                     <div className="flex flex-col items-center justify-center w-1/4">
                    <Label htmlFor="avatar" value="Profile Picture" />
                    <UploadWidget
                        uwConfig={{
                            cloudName: "dspicjwkq",
                            uploadPreset: "connectprofiles",
                            multiple: false,
                            maxImageFileSize: 2000000,
                            folder: "avatars",
                        }}
                        setState={setAvatar}
                    />
                    <img
                        src={avatar[0] || currentUser?.avatar || './noavatar.jpg'}
                        alt="Profile Avatar"
                        className="avatar w-90 h-90 object-cover mt-2"
                    />
                </div>
            </div>
        </>
    );
};
