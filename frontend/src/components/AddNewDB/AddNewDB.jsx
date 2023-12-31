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
            <input type="text" className="Host mr-3 p-1 text-black" placeholder="Host" required/>
            <input type="text" className="Port mr-3 p-1 text-black" placeholder="Port" required />
            <input type="text" className="DatabaseA mr-3 p-1 text-black" placeholder="Database Alias" required />
            <input type="text" className="username mr-3 p-1 text-black" placeholder="username" />
            <input type="text" className="password mr-3 p-1 text-black" placeholder="password" />
            <button className="mt-3 bg-violet-500 p-3 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick={connect}>Connect</button>
        </form>
    )
}

export default AddNewDB