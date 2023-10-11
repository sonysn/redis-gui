import React from 'react';
import { useNavigate } from "react-router-dom";
import './DatabaseList.css'; // Import the CSS file
import { ConnectToRedisDB, DeleteDBCredentials } from '../../../wailsjs/go/main/App';

function DatabaseList(props) {
    const navigate = useNavigate();
    let isConnected = false;

    async function connect() {
        if (isConnected) {
            return;
        }
        const isSaved = true;
        const res = await ConnectToRedisDB(props.databaseHost, props.databasePort, props.databasePassword, props.databaseUsername, props.databaseAlias, isSaved);
        if (res === "Connected to Redis!") {
            navigate('/dbHome', { state: { databaseAlias: props.databaseAlias } });
            isConnected = true;
            console.log("This is res", res);
        } else {
            alert("An error occurred. Please try again.: ", res);
            console.log("This is res", res);
        }
        // navigate('/dbHome', { state: { databaseAlias: props.databaseAlias } });
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
