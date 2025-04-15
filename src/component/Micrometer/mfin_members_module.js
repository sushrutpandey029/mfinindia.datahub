// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// import Breadcrumb from "../common/Breadcrumb";
// import GrassIcon from '@mui/icons-material/Grass';
// import 'bootstrap/dist/css/bootstrap.min.css';


// import { Link } from 'react-router-dom';

// const mfinMembersModule = () => {
//   const navigate = useNavigate(); // Initialize useNavigate

//   const cardData = [
//     {
//       title: 'NBFC-MFI',
//       content: 'Quarterly data for MFIN Member NBFC-MFIs',
//       link: '/micrometer',
//     },
//     {
//       title: 'Other REs',
//       content: 'Quarterly data for MFIN Member Other REs',
//       link: '#',
//     }
//   ];

//   return (
//     <div className='publicati_ns'>
//       <div className='mb-4' role="presentation">
//         <Breadcrumb
//           title="MFIN Members"
//           icon={GrassIcon}
//         />
//       </div>
//       <div className='containers-outs'>
//         {
//           cardData.map((card, index) => (
//             <div className='containers-ins' key={index}>
//               <Link to={card.link} class="ag-courses-item_link p-0">
//                 <div className='heading'>
//                   <h3>{card.title}</h3>
//                 </div>
//                 {card.content}
//               </Link>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// };

// export default mfinMembersModule;
import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mfin_members_module.css";

import { Link } from "react-router-dom";

const MfinMembersModule = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const cardData = [
    {
      title: "NBFC-MFI",
      content: "Quarterly data for MFIN Member NBFC-MFIs.",
      link: "/micrometer",
    },
    {
      title: "Other REs",
      content: "Quarterly data for MFIN Member Other REs.",
      link: "#",
    },
  ];

  return (
    <div className="publications">
      <div className="mb-4" role="presentation">
        <Breadcrumb title="MFIN Members" icon={GrassIcon} />
      </div>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <Link to={card.link}>
              <div className="heading">
                <h3>{card.title}</h3>
              </div>
            </Link>
            <div className="content">{card.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MfinMembersModule;