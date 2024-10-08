import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MiniDrawer from "./component/Drawer/Drawer";
import Login from "./component/Login/Login";
import LoginOTP from "./component/Login/LoginOTP";
import React, { useState } from "react";
import NoPermission from "./component/common/NoPermission";
import Feedback from "../src/component/feedback/Feedback"

function App() {
  const token = localStorage.getItem("loggedIn");
  const mobile_verify = localStorage.getItem("mobile_verify");
  const [flag, setFlag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePopup = () => {
    setFlag(!flag)
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {token && mobile_verify ? (
        <div style={{ backgroundColor: "#f4f5f7" }}>
          <Router>
            <MiniDrawer />
          </Router>

          {/* <div className='popbutton' onClick={handlePopup}>
            <button

              className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
              Feedback
            </button>
          </div> */}

          <div className='popbutton'>
            <button
            type="button"
              className="feed_back"
              onClick={openModal}>
              Feedback
            </button>
          </div>
          <Feedback isOpen={isModalOpen} closeModal={closeModal}/>




          {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className={`popupscreen ${flag ? 'active' : ''}`}>
            {flag && (
              <div className="popup-content">
                <Feedback handlePopup={handlePopup} />
              </div>
            )}
          </div> */}
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login-otp" element={<LoginOTP />} />
            <Route path="*" element={<NoPermission />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;