import React, { useEffect, useState } from "react";
import { uploadDataApi } from "../url/url";
import axios from "axios";
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";

import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MicromirrorResource.css";
// const MicrometerResource = () => {
//   const [dataList, setDataList] = useState([]);

//   var filterData = dataList.filter(item =>
//     item.p_heading === 'micrometer'
//   )

//   const fetchDataList = async () => {
//     try {
//       const response = await axios.get(`${uploadDataApi}/datapublicationlist`);
//       setDataList(response.data.data);
//       console.log("response", response);

//     } catch (err) {
//       console.log("err", err);
//     }
//   };

//   useEffect(() => {
//     fetchDataList();
//   }, []);

//   const handleDate = (dt) => {
//     const dateObj = new Date(dt);
//     const formattedDate = dateObj.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//     });
//     return formattedDate;
//   };
//   // handleSynopsisDownload
//   const handlePDFDownload = (pdf) => {
//     const link = document.createElement('a');
//     link.href = `https://api.mfinindia.org/public/${pdf}`;
//     link.target = "_blank"
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

// const handleSynopsisDownload = (pdf) => {
//   const link = document.createElement('a');
//   link.href = https://api.mfinindia.org/public/${pdf};
//   link.target="_blank"
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// Function to format date
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
};

const MicrometerResource = () => {
  const [dataList, setDataList] = useState([]);

  var filterData = dataList.filter(item =>
    item.p_heading === 'micrometer'
  )


  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => index + 1,
      center: true
    },

    {
      name: 'Issue',
      selector: row => row.p_title,
      center: true
    },

    {
      name: 'Release Date ',
      selector: row =>formatDate(row.date),
      center: true
    },
    {
      name: 'Get report',
      cell: row => (
        <button className="get_report" onClick={() => handlePDFDownload(row.pdf_file)}>
          <i class="bi bi-eye-fill"></i> Get Report
        </button>
      ),
      center: true
    },
  ];

  const fetchDataList = async () => {
    try {
      const response = await axios.get(`${uploadDataApi}/datapublicationlist`);
      setDataList(response.data.data);
      console.log("response", response);

    } catch (err) {
      console.log("err", err);
    }
  };




  useEffect(() => {
    fetchDataList();
  }, []);

  // const handleDate = (dt) => {
  //   const dateObj = new Date(dt);
  //   const formattedDate = dateObj.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //   });
  //   return formattedDate;
  // };
  // handleSynopsisDownload
  const handlePDFDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = `https://api.mfinindia.org/public/${pdf}`;
    link.target = "_blank"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // return (
  //   // <div style={{ marginTop: "5%" }}>
  //   <div className="row container-outs">

  //     <div className='mb-4' role="presentation">
  //       <Breadcrumb
  //         title="MicroMeter" secondTitle="Publication" secondUrl="/datapublicationcard" second={true}
  //         icon={GrassIcon}
  //       />

  //     </div>
  //     {filterData.map((cardData) => (
  //       <div className="col-sm-3 ">
  //         <div class="container-ins">
  //           <div className="top-contents">
  //             {/* <div> */}
  //             <p>
  //               <button onClick={() => handlePDFDownload(cardData.pdf_file)}>

  //                 <i class="bi bi-eye-fill"></i> Get Report
  //               </button>

  //             </p>
  //             {/* </div> */}
  //           </div>

  //           <div
  //             className="backimgs"
  //             style={{
  //               backgroundImage: `url("https://api.mfinindia.org/public/${cardData.image}")`,
  //               backgroundSize: 'cover',
  //               backgroundRepeat: 'no-repeat',
  //               backgroundSize:"100% 100%",
  //               borderRadius:"10px"

  //             }}
  //           >
  //             <div className="data">
  //               <p>Data as on {handleDate(cardData.date)}</p>
  //             </div>
  //           </div>

  //           <div className="micrometer-title">
  //             <p class="mb-0">{cardData.p_title}</p>
  //           </div>
  //           {/* <div className="bottom-content">
  //             <p>
  //               Synopsis Free for All  
  //               <button onClick={()=>handleSynopsisDownload(cardData.synopsis)}>Download</button>
  //             </p>

  //           </div> */}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  //   // </div>
  // );

  return (
    // <div style={{ marginTop: "5%" }}>
    <div className="row container-outs">
      <div role="presentation" className="mb-4">
        <Breadcrumb
          title="MicroMeter" secondTitle="Publication" secondUrl="/datapublicationcard" second={true}
          icon={GrassIcon}
        />
      </div>
      <div className="col-sm-8">
        <DataTable
          columns={columns}
          data={filterData}
          pagination
        />
      </div>
      <div className="col-sm-4 align-self-center">
        <h2 style={{
          fontWeight:'bold',
           borderBottom:'3px solid #2b60ad',
            margin:'0 auto',
             width:'50%',
             paddingBottom:'8px',
             fontSize:'2rem',
             color:'#2b60ad',
             marginBottom:'2rem',

            }
             }>Latest Report</h2>
        {filterData.length > 0 && (
          <div className="container-in w-75">
            <div className="top-content">
              <p>
                <button onClick={() => handlePDFDownload(filterData[0].pdf_file)}>
                  <i className="bi bi-eye-fill"></i> View Report
                </button>
              </p>
            </div>
            <div
              className="backimg"
              style={{
                backgroundImage: `url("https://api.mfinindia.org/public/${filterData[0].image}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                borderRadius: "10px",
              }}
            >
              <div className="dataas">
                <p>{formatDate(filterData[0].date)}</p> {/* Use formatDate for proper date format */}
              </div>
            </div>

            <div className="title">
              <p>{filterData[0].p_title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default MicrometerResource;


// not uploaded
// issue 25
// issue 28
// issue 30
// issue 37