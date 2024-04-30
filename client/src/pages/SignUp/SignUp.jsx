import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Textarea, FileInput, Spinner } from 'flowbite-react';
import { NavbarComponent } from '../../components/NavbarComponent';
import axios from "axios";
import toast from 'react-hot-toast';
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  // Set up state for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    jobTitle: '',
    department: '',
    location: '',
    shortBio: '',
    avatar: null, // Initialize avatar as null
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, avatar: file }); // Update formData with the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
        const res = await apiRequest.post("/auth/register", {
          ...formData
        });
        console.log("res", res)
        navigate("/");
        toast.success("Profile Created")
      } catch (err) {console.log('err', err)
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    // Here, you can send formData to the backend API
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="name@domain.com"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                name="username"
                placeholder="Your username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phoneNumber" value="Phone Number" />
              </div>
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
              <div className="mb-2 block">
                <Label htmlFor="jobTitle" value="Job Title" />
              </div>
              <TextInput
                id="jobTitle"
                name="jobTitle"
                placeholder="Your job title"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="department" value="Department" />
              </div>
              <TextInput
                id="department"
                name="department"
                placeholder="Your department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                name="location"
                placeholder="Your location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="shortBio" value="Short Bio" />
              </div>
              <Textarea
                id="shortBio"
                name="shortBio"
                placeholder="Write a short bio about yourself"
                value={formData.shortBio}
                onChange={handleInputChange}
              />
            </div>
            {/* Avatar FileInput */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="avatar" value="Profile Picture" />
              </div>
              <FileInput
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
                required={false} // Optional field, change to required if needed
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
          {isLoading && <><Spinner aria-label="Loading" /><span>Loading</span></>}
        </Card>
      </div>
    </>
  );
};
