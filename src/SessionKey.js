import { useEffect, useState } from 'react';
import axios from 'axios';

function ApiSession( {onSessionKeyReceived, getUserInfo} ){

    const [apiResponse, setApiResponse] = useState([]);

    useEffect(() => {
        axios.get(`https://api.openf1.org/v1/sessions`)
        .then(response => {
            setApiResponse(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return(
        <>
             <Form apiResponse={apiResponse} onSessionKeyReceived={onSessionKeyReceived} getUserInfo={getUserInfo}/>
        </>
    )
   
}

function Form({apiResponse, onSessionKeyReceived, getUserInfo}){

    const [sessionKey, setSessionKey] = useState([]);

    const [userInput, setUserInput] = useState({
        location:'',
        country:'',
        year: '',
        sessionName: '',
        driverName: '',
        driverNumber: ''
    });

    const sessionOptions = [
        'Practice 1',
        'Practice 2',
        'Practice 3',
        'Sprint Shootout',
        'Sprint',
        'Qualifying',
        'Race'
      ];

    const handleInputChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const { location, country, year, sessionName } = userInput;
      
        if (apiResponse && Array.isArray(apiResponse)) {
          const matchedSession = apiResponse.find(session => {
            const matchCondition =
            (!location || session.location.toLowerCase() === location.toLowerCase()) &&
            session.country_name.toLowerCase() === country.toLowerCase() &&
            session.year === parseInt(year) &&
            session.session_name.toLowerCase() === sessionName.toLowerCase();
      
            // console.log(
            //   `Checking session: ${session.session_name}, Match Condition: ${matchCondition}`
            // );
      
            return matchCondition;
          });
      
          if (matchedSession) {
            setSessionKey(matchedSession.session_key);
            onSessionKeyReceived(matchedSession.session_key);
            getUserInfo(userInput);
          } else {
            console.log('No matching session found');
          }
        } else {
          console.log('API response not available');
        }
      };

      return (
        <div className="flex justify-center items-center min-h-screen mt-40 md:mt-8 mb-8 md:-mb-24">
          <div className="bg-red-200 p-4 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl">
            <h2 className="text-lg md:text-2xl text-center font-bold mb-4 md:mb-6">Search for team radios using the parameters below:</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="country" className="block font-medium">
                  Country: <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  value={userInput.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="year" className="block font-medium">
                  Year: <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Enter year"
                  value={userInput.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="sessionName" className="block font-medium">
                  Session Type: <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  id="sessionName"
                  name="sessionName"
                  value={userInput.sessionName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a session</option>
                  {sessionOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1">
                <label htmlFor="location" className="block font-medium">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={userInput.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="driverName" className="block font-medium">
                  Driver Name:
                </label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  placeholder="Enter driver name"
                  value={userInput.driverName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="driverNumber" className="block font-medium">
                  Driver Number:
                </label>
                <input
                  type="text"
                  id="driverNumber"
                  name="driverNumber"
                  placeholder="Enter driver number"
                  value={userInput.driverNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors md:col-span-3"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      );
      
      
      
}

export default function SessionKey( {onSessionKeyReceived, getUserInfo} ){
   
    return(
        <>
            <ApiSession onSessionKeyReceived={onSessionKeyReceived} getUserInfo={getUserInfo}/>
        </>
    )
}