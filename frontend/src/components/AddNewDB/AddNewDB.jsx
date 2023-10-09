import { ConnectToRedisDB } from "../../../wailsjs/go/main/App.js";

function AddNewDB() {
    function connect() {
        const portInput = document.querySelector('.Port');
        const hostInput = document.querySelector('.Host');
        const databaseAliasInput = document.querySelector('.DatabaseA');
        const passwordInput = document.querySelector('.password');
        const usernameInput = document.querySelector('.username');
        const portValue = portInput.value;
        const hostValue = hostInput.value;
        const databaseAliasValue = databaseAliasInput.value;
        const passwordValue = passwordInput.value;
        const usernameValue = usernameInput.value;
        const isSaved = false;
        
        // console.log(portValue);
        ConnectToRedisDB(hostValue, portValue, passwordValue, usernameValue, databaseAliasValue, isSaved);
    }

    return (
        <form id="ms-form">
            <h2>Create New Connection</h2>
            <input type="text" className="Host" placeholder="Host" required />
            <input type="text" className="Port" placeholder="Port" required />
            <input type="text" className="DatabaseA" placeholder="Database Alias" required />
            <input type="text" className="username" placeholder="username" />
            <input type="text" className="password" placeholder="password" />
            <button onClick={connect}>Connect</button>
        </form>
    )
}

export default AddNewDB