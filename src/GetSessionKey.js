import { useState } from "react";
import SessionKey from "./SessionKey";

export default function GetSessionKey({ onSessionKeyReceived }) {
    const [sessionKey, setSessionKey] = useState([]);

    const handleSessionKeyReceived = (key) => {
        setSessionKey(key);
        console.log("Child Component received from parent SessionKey!");
        // Call the onSessionKeyReceived callback with the key
        onSessionKeyReceived(key);
        console.log("Handshake complete!");
    };

    return (
        <>
            <SessionKey onSessionKeyReceived={handleSessionKeyReceived} />
            {/* <h1> Session Key: {sessionKey}</h1> */}
        </>
    );
}