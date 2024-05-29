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
      
            console.log(
              `Checking session: ${session.session_name}, Match Condition: ${matchCondition}`
            );
      
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
        <div>
          <h2>Find Session Key</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                value={userInput.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                placeholder="Enter year"
                value={userInput.year}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sessionName">Session Name:</label>
              <input
                type="text"
                id="sessionName"
                name="sessionName"
                placeholder="Enter session name"
                value={userInput.sessionName}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Find Session Key</button>
          </form>
          {sessionKey && <p>Matched Session Key: {sessionKey}</p>}
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