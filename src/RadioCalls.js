import { useState, useEffect, useRef } from 'react';
import GetSessionKey from './GetSessionKey';
import axios from 'axios';

function ApiRadio({ radioSessionKey }) {
    const sessionKey = radioSessionKey;
    const [radios, setRadios] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
    if (radioSessionKey) {
        axios
        .get(`https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}`)
        .then((response) => {
            setRadios(response.data);
            console.log(response);
            console.log('Session key', radioSessionKey);
        })
        .catch((error) => {
            console.error(error);
        });
    } else {
        setRadios([]);
    }
    }, [radioSessionKey]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes} ${amPm}`;
    };

  const RadioMessage = ({ radio, index }) => {
    const audioRef = useRef(null);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-4">
        <p className="text-gray-600 font-semibold">Driver Number: {radio.driver_number}</p>
        <p className="text-gray-600 font-semibold mb-4">Date: {formatDate(radio.date)}</p>
        <audio ref={audioRef} controls className="w-full">
          <source src={radio.recording_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Radio Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {radios.map((radio, index) => (
          <RadioMessage key={`${radio.session_key}-${radio.meeting_key}-${radio.driver_number}-${index}`} radio={radio} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function RadioCalls() {
  const [radioSessionKey, setRadioSessionKey] = useState([]);

  const [userInfo, setUserInfo] = useState({
    location: '',
    country: '',
    year: '',
    sessionName: '',
  });

  return (

    <>
    <h1> test </h1>
    <div className="container mx-auto px-4 py-8">
      <GetSessionKey onSessionKeyReceived={setRadioSessionKey} getUserInfo={setUserInfo} />

      <h1 className="text-3xl font-bold text-center mb-8">
        Showing radio messages for the {userInfo.sessionName} session in {userInfo.country} for the weekend's {userInfo.location} Grand Prix in the season {userInfo.year}!
      </h1>

      <ApiRadio radioSessionKey={radioSessionKey} />
    </div>
    </>
    
  );
}