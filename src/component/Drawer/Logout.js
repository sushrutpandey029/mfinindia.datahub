import React, { useState, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from "../url/url";
import authHeaders from "../Service/AuthHeaders";

const LogoutCall = async () => {
    var userdetails = JSON.parse(localStorage.getItem('user'));

    await axios.get(`${BaseUrl}/api/auth/loginLogout?user_id=${userdetails.data.user.id}`, 
    { headers: authHeaders() })
    .then((response) => {
        localStorage.setItem("access_token","");
        localStorage.setItem("user","");
        localStorage.setItem("loggedIn","");
        localStorage.setItem("mobile_verify","");
        window.location.reload(true);
        console.log('logout api call');
    }).catch((error) => {
        console.log('err', error);
    });
};

const Logout = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(null);

    const resetTimer = () => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
            LogoutCall();
            navigate('/');
        }, 1800000)); // 30 minute = 1800000
    };

    useEffect(() => {
        // Event listeners for user activity
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                resetTimer();
            }
        });

        // Initial timer start
        resetTimer();

        // Cleanup
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            document.removeEventListener('visibilitychange', resetTimer);
        };
    }, [timer]);

    const logOutHandler = () => {
        LogoutCall();
        navigate('/');
    };

    return (
        <Typography
            style={{ color: "#fff" }}
            onClick={logOutHandler}
        >
            Logout
        </Typography>
    );
};

export default Logout;
