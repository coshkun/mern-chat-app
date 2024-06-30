import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChanges = (gender) => {
        setInputs({...inputs, gender});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(inputs);
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className=' text-blue-400'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Full name</span>
                        </label>
                        <input type="text" placeholder='Enter your full name' name="fullName" className=' w-full input input-bordered h-10' 
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' name="username" className=' w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' name="password" className=' w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Password again</span>
                        </label>
                        <input type="password" placeholder='Confirm password' name="confirmPassword" className=' w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>

                    <div>
                        <GenderCheckBox onCheckboxChange={handleCheckboxChanges} selectedGender={inputs.gender} />
                    </div>

                    <Link to={'/login'} className=' text-sm hover:underline hover:text-blue-300 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className=' btn btn-block btn-sm mt-2' disabled={loading}>
                            { loading ? <span className='loading loading-spinner' /> : "Signup" }
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SignUp



// STARTER CODE OF THIS FILE:
// import GenderCheckBox from './GenderCheckBox'

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//         <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//             <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                 Sign Up
//                 <span className=' text-blue-400'> ChatApp</span>
//             </h1>

//             <form>
//                 <div>
//                     <label className=' label p-2'>
//                         <span className=' text-base label-text'>Full name</span>
//                     </label>
//                     <input type="text" placeholder='Enter your full name' name="fullName" className=' w-full input input-bordered h-10' />
//                 </div>

//                 <div>
//                     <label className=' label p-2'>
//                         <span className=' text-base label-text'>Username</span>
//                     </label>
//                     <input type="text" placeholder='Enter username' name="username" className=' w-full input input-bordered h-10' />
//                 </div>

//                 <div>
//                     <label className=' label p-2'>
//                         <span className=' text-base label-text'>Password</span>
//                     </label>
//                     <input type="password" placeholder='Enter password' name="password" className=' w-full input input-bordered h-10' />
//                 </div>

//                 <div>
//                     <label className=' label p-2'>
//                         <span className=' text-base label-text'>Password again</span>
//                     </label>
//                     <input type="password" placeholder='Confirm password' name="confirmPassword" className=' w-full input input-bordered h-10' />
//                 </div>

//                 <div>
//                     <GenderCheckBox />
//                 </div>

//                 <a href="#" className=' text-sm hover:underline hover:text-blue-300 mt-2 inline-block'>
//                     Already have an account?
//                 </a>

//                 <div>
//                     <button className=' btn btn-block btn-sm mt-2'>Signup</button>
//                 </div>
//             </form>
//         </div>
        
//     </div>
//   )
// }