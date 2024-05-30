import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function DriverApi(){
    
    const [drivers, setDrivers] = useState([]);
    let currentYear = new Date().getFullYear()

    const instagramLinks = {
        VER: "https://www.instagram.com/maxverstappen1/",
        SAR: "https://www.instagram.com/logansargeant/",
        RIC: "https://www.instagram.com/danielricciardo/",
        NOR: "https://www.instagram.com/landonorris/",
        GAS: "https://www.instagram.com/pierregasly/",
        PER: "https://www.instagram.com/schecoperez/",
        ALO: "https://www.instagram.com/fernandoalo_oficial/",
        LEC: "https://www.instagram.com/charles_leclerc/",
        STR: "https://www.instagram.com/lance_stroll/",
        MAG: "https://www.instagram.com/kevinmagnussen/",
        TSU: "https://www.instagram.com/yukitsunoda0511/",
        ALB: "https://www.instagram.com/alex_albon/",
        ZHO: "https://www.instagram.com/zhouguanyu24/",
        HUL: "https://www.instagram.com/hulkhulkenberg/",
        OCO: "https://www.instagram.com/estebanocon/",
        HAM: "https://www.instagram.com/lewishamilton/",
        SAI: "https://www.instagram.com/carlossainz55/",
        RUS: "https://www.instagram.com/georgerussell63/",
        BOT: "https://www.instagram.com/valtteribottas/",
        PIA: "https://www.instagram.com/oscarpiastri/"
    };

    useEffect(() => {
        axios.get(`https://api.openf1.org/v1/drivers?session_key=latest`)
        .then(response => {
            setDrivers(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div className="container mx-auto px-4 mt-24 mb-16">
            <h1 className="text-3xl text-red-700 text-center font-mono mb-12">Get to know the superhumans in this {currentYear} season driving on the grid!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {drivers.map(driver => (
                    <a
                        key={driver.driver_number}
                        href={instagramLinks[driver.name_acronym]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                    >
                        <div className='hover:scale-105 shadow-2xl'>
                            <div
                                className="card-container rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:animate-shake"
                                style={{ backgroundColor: `#${driver.team_colour}` }}
                            >
                                <div className="max-w-xs">
                                    <img className="w-full mr-4" src={driver.headshot_url} alt={`${driver.full_name} headshot`} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold font-mono text-sm mb-2">{driver.full_name} ({driver.name_acronym})</div>
                                        <p className="text-gray-950	 font-mono text-lg font-bold">Driver Number: {driver.driver_number}</p>
                                        <p className="text-fuchsia-900 font-mono font-semibold">Country: {driver.country_code}</p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{driver.team_name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

