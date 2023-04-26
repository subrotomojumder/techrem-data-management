import { useUserDeleteMutation } from '@/app/features/users/userApi';
import { errorToast } from '@/utils/neededFun';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'

const SingleUser = ({ user }) => {
    const [deletedUser, setDeletedUser] = useState(null);
    const [deleteUser] = useUserDeleteMutation();
    const { name, email, role, userImage, userId, _id } = user;
    const handleUserDelete = (id) => {
        // return console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id).then(res => {
                    if (res.error) {
                        if (res.error.error) {
                            errorToast(res.error.error)
                        }
                        if (!res.error.data.success) {
                            errorToast(res.error.data.message)
                            console.log(res.error.data.message)
                        }
                    }
                    if (res.data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Your employee has been deleted.',
                            'success'
                        )
                    };
                })
            }
        })
        return

    };
    return (
        <>
            <div style={{ background: "rgba(247, 242, 251, 0.69)" }} className='rounded-lg p-2 relative hover:outline outline-2 outline-indigo-500 sm:mx-4 smm:mx-0'>
                <div className='flex sm:flex-row sm:justify-start smm:flex-col smm:gap-2'>
                    <img className='min-h-[10%] max-h-[120px] smm:max-h-full smm:w-full md:max-h-[150px]' src={userImage} alt={name} />
                    <div className='ml-2 sm:ml-4 smm:ml-0 flex flex-col justify-center gap-2'>
                        <div className='smm:text-center'>
                            <h5 className='text-md font-semibold text-gray-800'><span>{name?.slice(0, 18)}</span></h5>
                            <p className='text-sm font-semibold text-green-600 mt-[-4px]'>{email}</p>
                            <p className='text-xs font-semibold mb-2'>User-ID: {userId}</p>
                            <p className='text-sm font-bold'>Role: {role}</p>
                        </div>
                        <Link href={`/authentication/user_profile/${_id}`}> <button className={`w-full font-medium border border-blue-600 rounded pb-[1px] text-center text-blue-600 hover:text-white hover:bg-blue-600 active:bg-blue-700`}>view details</button></Link>
                    </div>
                </div>
                <div className='absolute top-3 right-3'>
                    <button
                        onClick={() => handleUserDelete(_id)}
                        className='bg-gray-100 hover:bg-gray-300 active:bg-gray-400 px-2 py-2 rounded-full'
                    >
                        <FaTrash className="text-red-600" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SingleUser;