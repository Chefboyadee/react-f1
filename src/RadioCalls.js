import { useState, useEffect, useRef } from 'react';
import GetSessionKey from './GetSessionKey';
import axios from 'axios';

function ApiRadio({ radioSessionKey, userInfo}) {
  const sessionKey = radioSessionKey;
  const [radios, setRadios] = useState([]);
  const audioRef = useRef(null);
  const { driverNumber } = userInfo;
  const [drivers, setDrivers] = useState([]);

  
    useEffect(() => {
      axios.get(`https://api.openf1.org/v1/drivers?session_key=latest`)
      .then(response => {
          setDrivers(response.data);
      })
      .catch(error => {
          console.error(error);
      });
  }, []);

  useEffect(() => {
    if (radioSessionKey) {
      const fetchRadioData = async () => {
        let apiUrl;
  
        if (driverNumber) {
          // If driverNumber is provided, use it directly
          apiUrl = `https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}&driver_number=${driverNumber}`;
        } else if (userInfo.driverName) {
          // If driverName is provided but not driverNumber, try to find the driverNumber from the drivers data
          const matchedDriver = drivers.find(
            (driver) =>
              driver.full_name.toLowerCase() === userInfo.driverName.toLowerCase()
          );
  
          if (matchedDriver) {
            apiUrl = `https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}&driver_number=${matchedDriver.driver_number}`;
          } else {
            // If no matching driver is found, fallback to the default API URL
            apiUrl = `https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}`;
          }
        } else {
          // If neither driverNumber nor driverName is provided, use the default API URL
          apiUrl = `https://api.openf1.org/v1/team_radio?session_key=${radioSessionKey}`;
        }
  
        try {
          const response = await axios.get(apiUrl);
          setRadios(response.data);
          console.log(response);
          console.log('Session key', radioSessionKey);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchRadioData();
    } else {
      setRadios([]);
    }
  }, [radioSessionKey, driverNumber, userInfo.driverName, drivers]);

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
    const driver = drivers.find(driver => driver.driver_number === radio.driver_number);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-4">
        <p className="text-gray-600 font-semibold">
          Driver: {driver ? driver.full_name : 'Unknown'} (Number: {radio.driver_number})
        </p>
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
    driverName: '',
    driverNumber: ''
  });

  return (
    <>
    <h1 className='mt-32 -mb-40 text-center font-mono font-bold text-4xl'> Formula One - Teams' Radio Messages </h1>
    <div className="container mx-auto px-4 py-8">
      <GetSessionKey onSessionKeyReceived={setRadioSessionKey} getUserInfo={setUserInfo} />
      <ApiRadio radioSessionKey={radioSessionKey} userInfo={userInfo}/>
    </div>
    </>
    
  );
}