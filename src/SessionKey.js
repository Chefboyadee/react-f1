import { useEffect, useState } from 'react';
import axios from 'axios';

function ApiSession(){

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
             <Form apiResponse={apiResponse}/>
        </>
    )
   
}

function Form({apiResponse}){

    const [sessionKey, setSessionKey] = useState([]);

    const [userInput, setUserInput] = useState({
        country:'',
        year: '',
        sessionName: ''
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
        const { country, year, sessionName } = userInput;
      
        if (apiResponse && Array.isArray(apiResponse)) {
          const matchedSession = apiResponse.find(session => {
            const matchCondition =
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
          } else {
            console.log('No matching session found');
          }
        } else {
          console.log('API response not available');
        }
      };

    return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Please enter a country, year and session type!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="country" className="block font-medium">
                Country:
            </label>
            <input
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
                Year:
            </label>
            <input
                type="text"
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
                Session Name:
            </label>
            <select
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
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
            Enter
            </button>
        </form>
        </div>
    </div>
    );
}

export default function SessionKey(){
   
    return(
        <>
            <ApiSession/>
        </>
    )
}