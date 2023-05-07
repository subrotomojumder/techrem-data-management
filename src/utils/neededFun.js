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