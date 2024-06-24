import React from 'react'
import GenderCheckBox from './GenderCheckBox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign Up
                <span className=' text-blue-400'> ChatApp</span>
            </h1>

            <form>
                <div>
                    <label className=' label p-2'>
                        <span className=' text-base label-text'>Full name</span>
                    </label>
                    <input type="text" placeholder='Enter your full name' name="fullName" className=' w-full input input-bordered h-10' />
                </div>

                <div>
                    <label className=' label p-2'>
                        <span className=' text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' name="username" className=' w-full input input-bordered h-10' />
                </div>

                <div>
                    <label className=' label p-2'>
                        <span className=' text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' name="password" className=' w-full input input-bordered h-10' />
                </div>

                <div>
                    <label className=' label p-2'>
                        <span className=' text-base label-text'>Password again</span>
                    </label>
                    <input type="password" placeholder='Confirm password' name="confirmPassword" className=' w-full input input-bordered h-10' />
                </div>

                <div>
                    <GenderCheckBox />
                </div>

                <a href="#" className=' text-sm hover:underline hover:text-blue-300 mt-2 inline-block'>
                    Already have an account?
                </a>

                <div>
                    <button className=' btn btn-block btn-sm mt-2'>Signup</button>
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