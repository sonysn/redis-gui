import React from 'react';
// import {  } from 'react-router-dom';
import './DatabaseList.css'; // Import the CSS file
import { ConnectToRedisDB, DeleteDBCredentials } from '../../../wailsjs/go/main/App';

function DatabaseList(props) {

    function connect() {
        const isSaved = true;
        ConnectToRedisDB(props.databaseHost, props.databasePort, props.databasePassword, props.databaseUsername, props.databaseAlias, isSaved);
    }

    async function deleteDBCredentials() {
        const res = await DeleteDBCredentials(props.databaseHost, props.databasePort, props.databasePassword, props.databaseUsername, props.databaseAlias);
        console.log("This is res", res);
        if (res === "Deleted!") {
            window.location.reload();
        } else {
            console.log("Failed to delete: ", res);
        }
    }

    if (props.isDBListEMpty) {
        return <div>No databases found.</div>;
    } else {
        return (
            <div className="DatabaseList">
                <div className="database-info w-screen justify-between">
                    <p className="database-alias">Alias: {props.databaseAlias}</p>
                    <p className="database-host-port">Host and Port: {props.databaseHostNPort}</p>
                    <p>Password: {props.databasePassword}</p>
                    <p>Username: {props.databaseUsername}</p>
                    <button className="bg-violet-500 p-3 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick={connect}>Connect</button>
                    <button className="bg-violet-500 p-3 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick={deleteDBCredentials}>Delete</button>
                </div>
            </div>
        );
    }
}

export default DatabaseList;
