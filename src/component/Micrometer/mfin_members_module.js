import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from '@mui/icons-material/Grass';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link } from 'react-router-dom';

const mfinMembersModule = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const cardData = [
    {
      title: 'NBFC-MFI',
      content: 'Micrometer is MFIN’s flagship publication. A quarterly periodical, it finds pride of place with every microfinance stakeholder owing to its exhaustive updates on the key operational and financial indicators of the microfinance industry at a pan India and State level. The Publication is a valuable source of data for many financial institutions.',
      link: '/micrometer',
    },
    {
      title: 'Other REs',
      content: 'MicroMirror is a quarterly District Risk Index (DRI) Report that analyses the district level outreach and progress of the ‘Universe’ to provide the required intelligence to MFIN Members and Associates to manage their district presence in a more informed manner. The Universe includes all types of lenders in the microfinance space like Banks, NBFC-MFIs, SFBs, NBFCs and others (non-profit institutions).',
      link: '#',
    }
  ];

  return (
    <div className='publicati_ns'>
      <div className='mb-4' role="presentation">
        <Breadcrumb
          title="MFIN Members"
          icon={GrassIcon}
        />
      </div>
      <div className='containers-outs'>
        {
          cardData.map((card, index) => (
            <div className='containers-ins' key={index}>
              <Link to={card.link} class="ag-courses-item_link p-0">
                <div className='heading'>
                  <h3>{card.title}</h3>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default mfinMembersModule;
