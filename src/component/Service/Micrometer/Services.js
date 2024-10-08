import { BaseUrl } from "../../url/url";
import authHeaders from "../AuthHeaders";
import axios from "axios";

export const testingData = async (request) =>{
    const api = "api/auth/contact-details/2";
    return await axios.get(`${BaseUrl}/${api}`,{headers: authHeaders()});

}