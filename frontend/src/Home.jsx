import React, { useEffect, useState } from 'react';
import { ReadDBCredentials } from '../wailsjs/go/main/App';
import './Home.css';
import AddNewDB from './components/AddNewDB/AddNewDB';
import DatabaseList from './components/databaseList/DatabaseList';
// import DatabaseList from './components/databaseList/DatabaseList';

function Home(){
    const [data, setData] = useState({});

    useEffect(() => {
        ReadDBCredentials().then((data) => {
            parsedData = JSON.parse(data);
            setData(parsedData);
        })
        console.log("hbvhbvjhdv");
    }, []);

    var dataMap = Array.from(data)
    console.log(dataMap);
    console.log("hbvhbvjhdv");

    return(
        <div>
            <h1>My Redis Databases</h1>
            <button>+ ADD REDIS DATABASE</button>
            <textarea className='search'></textarea>
            <DatabaseList databaseAlias='Database A' databaseHostNPort='localhost:6379' databasePassword='password' databaseUsername='username'/>
            <AddNewDB/>
        </div>
    );
}

export default Home;