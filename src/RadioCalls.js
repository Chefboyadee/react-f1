import { useState, useEffect, useRef } from 'react';
import GetSessionKey from './GetSessionKey';
import axios from 'axios';

function ApiRadio( {radioSessionKey} ){

    const sessionKey = radioSessionKey;
    const [radios, setRadios] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        if (radioSessionKey) {
            axios.get(`https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}`)
                .then(response => {
                    setRadios(response.data);
                    console.log(response);
                    console.log("Session key", radioSessionKey);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setRadios([]); 
        }
    }, [radioSessionKey]);

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes} ${amPm}`;
    }

    return(
        <>
            <div>
            <h1>Radio Messages</h1>
            <ul>
                {radios.map((radio, index) => (
                    <li key={index}>
                        <br/>
                        <p>Driver Number: {radio.driver_number}</p>
                        <p>Date: {formatDate(radio.date)}</p>
                        <audio ref={audioRef} controls>
                            <source src={radio.recording_url} type="audio/mpeg"/>
                        </audio>
                    </li>
                ))}
            </ul>
        </div>
           
        </>
    );
}

export default function RadioCalls() {

    const [radioSessionKey, setRadioSessionKey] = useState([]);

    const [userInfo, setUserInfo] = useState({
        location:'',
        country:'',
        year: '',
        sessionName: ''
    });

    return (
        <>
            <GetSessionKey onSessionKeyReceived={setRadioSessionKey} getUserInfo={setUserInfo} />
             
            <h1>Session Key: {radioSessionKey}</h1>
            <h1>Location {userInfo.location}</h1>
            <h1>Country: {userInfo.country}</h1>
            <h1>Year: {userInfo.year}</h1>
            <h1>Session Name: {userInfo.sessionName}</h1>
            <br/>
            <ApiRadio radioSessionKey={radioSessionKey}/>
        </>
    );
}