import Image from 'next/image';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

export const successToast = (message) => toast.success(message);
export const errorToast = (message) => toast.error(message);

export const errorSweetAlert = (message) => {
    // return console.log(id);
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
};

export const updateConfirm = (updatedData, setUpdateEntry) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't update business date!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
    }).then((result) => {
        if (result.isConfirmed) {
            setUpdateEntry(updatedData)
        }
    })
}