import React, { useEffect, useState } from "react";
import { FaDatabase, FaGreaterThan, FaKey } from "react-icons/fa"
import { CgBolt, CgDisc, CgKey, CgRead } from "react-icons/cg"
import { useLocation, useNavigate } from "react-router-dom";
import { GetNumberOfKeys, GetTotalDBSize } from "../../wailsjs/go/main/App";
import { DisconnectFromRedisDB } from "../../wailsjs/go/main/App";

function DBHome() {
    const location = useLocation();
    const DatabaseAlias = location.state.databaseAlias;
    return (
        // <p className= "DatabaseList mx-35 text-black font-bold" style={{color: "red"}}>DatabaseAlias</p>
        <div className=" h-auto w-auto">
            <Header databaseAlias={DatabaseAlias} />
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
        getData();
    }, [])

    function getData() {
        // for (; ;) {
            GetNumberOfKeys().then((data) => { setKeyNum(data); })
            GetTotalDBSize().then((data) => { setMemSize(data); })
        // }
    }

    function disconnect(){
        navigate('/');
    }

    return (
        <div className=" flex justify-around">

            <p className="DBName text-black font-bold text-3xl">{props.databaseAlias}</p>
            <div className="flex"><CgDisc className="text-black text-3xl" />
                <p className="MemorySize text-black font-bold text-3xl">{memSize}</p>
            </div>
            <div className="flex">
                <FaKey className="text-black text-3xl" />
                <p className="KeyNum text-black font-bold text-3xl">{keyNum}</p>
            </div>
            {isReload ? (
                <CgBolt className="text-black text-3xl" onClick={() => { setIsReload(!isReload); setInterval(getData, 2000) }} />
            ) : (
                <CgRead className="text-black text-3xl" onClick={() => setIsReload(!isReload)} />
            )}

            <div className="flex">
                <textarea className='Seconds w-10 h-10 text-black text-center'></textarea><span className="text-black font-bold">s</span>
            </div>
            {/* <FaGreaterThan className="text-black text-3xl" onClick={navigate('/')} /> */}
        </div>
    )
}