import { BaseUrl,getContactListApi,addContactApi,getContactDetailsApi } from "../../url/url";
import authHeaders from "../AuthHeaders";
import axios from "axios";

export const getContactRecords = async (request) =>{
    const api = `${getContactListApi}`;
    return await axios.get(`${BaseUrl}/${api}`,{headers: authHeaders()});

}

export const addContactService = async (request) =>{
    const api = `${addContactApi}`;
    return await axios.post(`${BaseUrl}/${api}`,request,{headers: authHeaders()});

}

export const getContactDetailsService = async (id) =>{
    const api = `${getContactDetailsApi}`
    return await axios.get(`${BaseUrl}/${api}/${id}`,{headers: authHeaders()});

}