import React from 'react';
import './DatabaseList.css'; // Import the CSS file

function DatabaseList(props) {

    if (props.isDBListEMpty) {
        return null
    } else {
        return (
            <div className="DatabaseList">
                <div className="database-info">
                    <p>Alias: {props.databaseAlias}</p>
                    <p>Host and Port: {props.databaseHostNPort}</p>
                    <p>Password: {props.databasePassword}</p>
                    <p>Username: {props.databaseUsername}</p>
                </div>
            </div>
        );
    }
}

export default DatabaseList;
