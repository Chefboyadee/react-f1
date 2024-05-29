import { useState } from "react";
import SessionKey from "./SessionKey";

export default function GetSessionKey( {getChildSessionKey} ){

    const [sessionKey, setSessionKey] = useState([]);

    const handleSessionKeyReceived = (key) => {
        setSessionKey(key);
        console.log("Child Component received from parent SessionKey!")
    };

    if(sessionKey){
        getChildSessionKey(sessionKey);
        console.log("Handshake complete!");
    } else {
        console.log("Child component not passed.")
    }
    return(
        <>
        <SessionKey onSessionKeyReceived={handleSessionKeyReceived}/>
        {/* <h1> Session Key: {sessionKey}</h1> */}
        </>
    );
}