import React from "react";
import { ToastContainer,toast } from 'material-react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SuccessFailedMessage = () =>{
    return (
        <>
        <ToastContainer position="top-right" />
        </>
    )
}

export const SuccessToastMessage = (message,id) =>{
    toast.success(message, {
        toastId: id,
    });
}
export const ErrorToastMessage = (message,id) =>{
    toast.error(message, {
        toastId: id,
    });
}
export const DarkToastMessage = (message,id) =>{
    toast.dark(message, {
        toastId: id,
    });
}
export const WarningToastMessage = (message,id) =>{
    toast.warning(message, {
        toastId: id,
    });
}
export const InfoToastMessage = (message,id) =>{
    toast.info(message, {
        toastId: id,
    });
}
