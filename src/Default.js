import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';


function Default() {

    const navigate = useNavigate();


    const handleReturnToReg = () => {
        navigate('/signup'); 
    };
    const handleReturnToLog = () => {
        navigate('/login'); 
    };


    return (
        <>
        <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>

                <div className="mb-6">
                    <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login Form or Signup Form</label>
                   
                </div>

                <div className="flex items-center justify-between">
                <button
                        type="button"
                        onClick={handleReturnToLog}
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >Login
                    </button>
                    <button
                        type="button"
                        onClick={handleReturnToReg}
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Sign Up
                    </button>
                </div>
                </div>
        </>
    );
}

export default Default;
