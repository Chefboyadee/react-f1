import { useEffect, useState } from 'react';
import GetSessionKey from './GetSessionKey';
import axios from 'axios';

export default function RadioCalls(){

    const [radioSessionKey, setRadioSessionKey] = useState([]);

    const getRadioSessionKey = (key) => {
        setRadioSessionKey(key);
    };

    return(
        <>
            <GetSessionKey getChildSessionKey={getRadioSessionKey}/>
            <h1> Session Key: {radioSessionKey}</h1>
        </>
    );
}