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
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Please enter the required details</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors col-span-3"
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