import { useState } from "react";
import SessionKey from "./SessionKey";

export default function GetSessionKey({ onSessionKeyReceived, getUserInfo }) {
    const [sessionKey, setSessionKey] = useState([]);

    const [userInfo, setUserInfo] = useState({
        location:'',
        country:'',
        year: '',
        sessionName: ''
    });

    const handleSessionKeyReceived = (key) => {
        setSessionKey(key);
        console.log("Child Component received from parent SessionKey!");
        setUserInfo(key);
        // Call the onSessionKeyReceived callback with the key
        onSessionKeyReceived(key);
        getUserInfo(key);
        console.log("Handshake complete!");
    };

    return (
        <>
            <SessionKey onSessionKeyReceived={handleSessionKeyReceived} getUserInfo={getUserInfo}/>
            {/* <h1> Session Key: {sessionKey}</h1> */}
        </>
    );
}