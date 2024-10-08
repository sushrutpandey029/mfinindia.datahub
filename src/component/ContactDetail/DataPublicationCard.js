import React, { useState } from 'react'
import './DataPublicationCard.css'
import { useNavigate } from 'react-router-dom'
import { uploadDataApi } from '../url/url'
import axios from 'axios'

import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";


const DataPublicationCard = () => {

    const [dataList, setDalaList] = useState([]);
    const navigate = useNavigate();

    const cardData = [
        {
            title: 'Micrometer',
            content: 'Micrometer is MFIN’s flagship publication. A quarterly periodical, it finds pride of place with every microfinance stakeholder owning to its exhaustive updates on the key operational and financial indicators of the microfinance industry at a pan India and State level. The Publication is a valuable source of data for many financial institutions.',
            path: 'micrometerresource'
        },
        {
            title: 'Micromirror',
            content: 'MicroMirror is a quarterly District Risk Index (DRI) Report that analyses the district level outreach and progress of the ‘Universe’ to provide the required intelligence to MFIN Members and Associates to manage their district presence in a more informed manner. The Universe includes all types of lenders in the microfinance space like Banks, NBFC-MFIs, SFBs, NBFCs and others (non-profit institutions).',
            path: 'micromirrorresource'
        },
        {
            title: 'Micromatter',
            content: 'Annual industry report of MFIN. The report contains detailed analysis of the microfinance sector ecosystem for the past financial year.',
            path: 'micromatterresource'
        },
        {
            title: 'Other Publications',
            content: 'Studies, reports commissioned and published by MFIN on various themes.',
            path: 'otherpublicationsresource'
        }
    ]

    const handleNaivgate = async (path) => {
        try {
            const response = await axios.get(`${uploadDataApi}/datapublicationlist`);
            setDalaList(response.data.data);
            console.log('resp', response);
            navigate(`/${path}`)

        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <div className='publicati_ns'>
            <div className='mb-4' role="presentation">
                <Breadcrumb
                    title="Publication"
                    icon={GrassIcon}
                />

            </div>
            <div className='containers-outs'>
                {
                    cardData.map((cardData) => (
                        <div className='containers-ins'>
                            <div className='heading'>
                                <h3>{cardData.title}</h3>
                            </div>

                            <div className='description'>
                                <p>{cardData.content}</p>
                            </div>
                            <div className='view-button'>
                                <button onClick={() => navigate(`/${cardData.path}`)}>
                                    View All</button>
                            </div>

                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default DataPublicationCard