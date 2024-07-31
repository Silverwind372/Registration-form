import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile');
                setUserData(response.data);
            } catch (error) {
                console.error('There was an error fetching the user data!', error);
                setError('Failed to fetch user data. Please log in again.');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (error) {
            navigate('/login');
        }
    }, [error, navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout'); // Adjust the URL as needed
            // Clear local storage or session storage
            localStorage.removeItem('token'); // If you use local storage to store auth token
            sessionStorage.clear(); // Clear all session storage
            setUserData(null);
            navigate('/login');
        } catch (error) {
            console.error('There was an error logging out!', error);
            setError('Failed to log out. Please try again.');
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'>
            <h1 className='text-xl font-bold'>User Profile</h1>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            <p><strong>Birthday:</strong> {userData.birthday}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Encrypted Password:</strong> {userData.password}</p>
            <button
                onClick={handleLogout}
                className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
                Logout
            </button>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>
    );
}

export default Profile;
