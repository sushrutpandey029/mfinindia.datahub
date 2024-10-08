import React, { useEffect, useState } from "react";
import { uploadDataApi } from "../url/url";
import axios from "axios";

import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";

import "./OtherpublicationsResource.css";

const MicromirrorResource = () => {

  const [dataList, setDataList] = useState([]);
  const [data, setData] = useState([]);

  var filterData = dataList.filter(item =>
    item.p_heading === 'otherpublications'
  )

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


  const handlePDFDownload = (pdf) => {
    const pdfUrl = `https://api.mfinindia.org/public/${pdf}`;
    const viewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;
    window.open(viewerUrl, '_blank');
  }

  const handleDate = (dt) => {
    const dateObj = new Date(dt);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    return formattedDate;
  };
  return (
    <div className=" row container-out">

      <div className='mb-4' role="presentation">
        <Breadcrumb
          title="OtherPublications" secondTitle="Publication" secondUrl="/datapublicationcard" second={true}
          icon={GrassIcon}
        />

      </div>
      {filterData.map((cardData) => (
        <div className="col-sm-3">
          <div className="container-in2">
          <div className="top-content">
            <p> <button onClick={() => handlePDFDownload(cardData.pdf_file)}><i class="bi bi-eye-fill"></i> View Report</button></p>
          </div>
          <div
            className="backimg"
            style={{
              backgroundImage: `url("https://api.mfinindia.org/public/${cardData.image}")`,
              backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
               backgroundSize:"100% 100%",
               borderRadius:"10px 10px 0px 0px"
              
            }}
          >
            
          </div>

          <div className="title">
            <p>{cardData.p_title}</p>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

export default MicromirrorResource


//not uploaded
// issue 16