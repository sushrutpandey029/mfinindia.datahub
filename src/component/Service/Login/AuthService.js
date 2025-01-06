import React from "react";
import { BaseUrl,loginApi,loginOTOApi,DRIMapApi, ChangePasswordApi,ForgotPasswordApi, ChangePhoneApi } from "../../url/url";
import axios from "axios";

export const authLogin = async (request) =>{
    const api = `${loginApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);

};
export const authLoginOTP = async (request) =>{
    const api = `${loginOTOApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);

}

export const authForgotPassword = async (request) =>{
    const api = `${ForgotPasswordApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);

}
export const authChangePassword = async (request) =>{
    const api = `${ChangePasswordApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);

}

export const authChangePhone = async (request) => {
    const api = `${ChangePhoneApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);
}



export const authUpdateDriMap = async (request) =>{
    const api = `${DRIMapApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request);

}