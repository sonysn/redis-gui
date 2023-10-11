import React, { useEffect, useState } from "react";
import { FaDatabase, FaGreaterThan, FaHome, FaKey } from "react-icons/fa"
import { CgBolt, CgDisc, CgKey, CgRead } from "react-icons/cg"
import { useLocation, useNavigate } from "react-router-dom";
import { GetNumberOfKeys, GetTotalDBSize, GetAllKeysAndTypeAndMemory } from "../../wailsjs/go/main/App";
import { DisconnectFromRedisDB } from "../../wailsjs/go/main/App";

function DBHome() {
    const location = useLocation();
    const DatabaseAlias = location.state.databaseAlias;
    const [keys, setKeyList] = useState({});

    useEffect(() => {
        GetAllKeysAndTypeAndMemory().then((data) => { setKeyList(data); console.log("This is data", data); });
    }, []);

    var keyMap = Array.from(keys)


    return (
        // <p className= "DatabaseList mx-35 text-white font-bold" style={{color: "red"}}>DatabaseAlias</p>
        <div className=" h-auto w-auto">
            <LeftDrawer />
            <Header databaseAlias={DatabaseAlias} />
            {keyMap.map((keyMap, index) => {
                return <KeyList indexed={index} keyType={keyMap.Type} keyName={keyMap.Key} keyMemSize={keyMap.MemorySize} />
            })}
            {/* <KeyList />
            <KeyList /> */}
        </div>
    )
}

export default DBHome;

function Header(props) {
    const navigate = useNavigate();
    const [isReload, setIsReload] = useState(false);
    const [memSize, setMemSize] = useState("0 B");
    const [keyNum, setKeyNum] = useState("No Keys");
    const timeS = document.querySelector('.Seconds');

    useEffect(() => {
        GetNumberOfKeys().then((data) => { setKeyNum(data); })
        GetTotalDBSize().then((data) => { setMemSize(data); })
        // GetAllKeysAndTypeAndMemory().then((data) => { /*console.log("This is data", data);*/ setKeyList(data); })
        setInterval(getData, 2000)
    }, [])



    function getData() {
        // for (; ;) {
        GetNumberOfKeys().then((data) => { setKeyNum(data); })
        GetTotalDBSize().then((data) => { setMemSize(data); })
        // }
    }

    function disconnect() {
        navigate('/');
    }

    return (
        <div className=" flex justify-around justify-items-start mb-4">

            <p className="DBName text-white font-bold text-3xl">{props.databaseAlias}</p>
            <div className="flex w-56">
                <CgDisc className="text-white text-3xl" />
                <p className="MemorySize text-white font-bold text-3xl ml-2">{memSize}</p>
            </div>
            <div className="flex">
                <FaKey className="text-white text-3xl" />
                <p className="KeyNum text-white font-bold text-3xl ml-2">{keyNum}</p>
            </div>
            {isReload ? (
                <CgBolt className="text-white text-3xl" onClick={() => { setIsReload(!isReload); /*setInterval(getData, 2000) /*WILL RUN ON PAGE LOAD */ }} />
            ) : (
                <CgRead className="text-white text-3xl" onClick={() => setIsReload(!isReload)} />
            )}

            <div className="flex">
                <input type="number" className='Seconds w-14 h-7 text-white text-center bg-transparent border-b border-0'></input><span className="text-white font-bold ml-2">s</span>
            </div>
            {/* <FaGreaterThan className="text-white text-3xl" onClick={navigate('/')} /> */}
        </div>
    )
}

function KeyList(props) {

    const id = 0;
    let colour = "grey";

    if (props.indexed % 2 === 0) {
        colour = "black";
    }


    return (
        <div className="flex justify-items-start p-1" style={{ backgroundColor: colour }}   >
            <p className=" text-lg">{props.keyType}</p>
            <p className=" text-lg ml-16">{props.keyName}</p>
            <p className=" text-lg ml-auto">{props.keyMemSize}</p>
        </div>
    )
}

function LeftDrawer(){
    return(
        <div className=" w-0 flex justify-center items-center float-left bg-slate-600 mr-1 h-screen">
            <p>#</p>
            <FaHome />
        </div>
    )
}