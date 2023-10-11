import React, { useEffect, useState } from 'react';
import { ReadDBCredentials } from '../wailsjs/go/main/App';
import './Home.css';
import AddNewDB from './components/AddNewDB/AddNewDB';
import DatabaseList from './components/databaseList/DatabaseList';
// import DatabaseList from './components/databaseList/DatabaseList';

function Home() {
    const [data, setData] = useState({});

    useEffect(() => {
        ReadDBCredentials().then((data) => {
            // console.log("This is data", data);
            // parsedData = JSON.parse(data);
            setData(data);
        })
    }, []);

    var dataMap = Array.from(data)
    // console.log("This is dataMap",dataMap[0].Host);
    // console.log("hbvhbvjhdv");

    return (
        <div>
            <h1>My Redis Databases</h1>
            <div className="grid grid-cols-2 justify-between">
                <button className="bg-violet-500 p-4 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">+ ADD REDIS DATABASE</button>
                <textarea className='search'></textarea>
            </div>
            {dataMap.map(dataMap => {
                return <DatabaseList databaseAlias={dataMap.DatabaseAlias} databaseHostNPort={dataMap.Host + ":" + dataMap.Port} databasePassword={dataMap.Password} databaseUsername={dataMap.Username} databaseHost={dataMap.Host} databasePort={dataMap.Port} />
            })}
            <AddNewDB />
        </div>
    );
}

export default Home;