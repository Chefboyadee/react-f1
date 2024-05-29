import { useState } from 'react';
import GetSessionKey from './GetSessionKey';

export default function RadioCalls() {
    const [radioSessionKey, setRadioSessionKey] = useState([]);

    return (
        <>
            <GetSessionKey onSessionKeyReceived={setRadioSessionKey} />
            <h1>Session Key: {radioSessionKey}</h1>
        </>
    );
}