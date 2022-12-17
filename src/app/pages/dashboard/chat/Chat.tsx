import SidebarChats from "./partials/SidebarChats"
import ConversationsChat from "./partials/ConversationsChat"

import {io} from 'socket.io-client'
import { useEffect, useState } from "react"
const socket = io('http://localhost:3000', { transports : ['websocket'] })

function Chat(){

    const [users, setUsers] = useState([
        {
            name:"Joao",
            email:"joao@email.com"
        }
    ])

    useEffect(() => {
        socket.emit('join-request', 'Matheus')
    }, [])

    socket.on('user-ok', (list)=>{
        //setUsers(list)
    })

    return(
        <div className="d-flex flex-column flex-lg-row">
            <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
                <SidebarChats users={users}/>
            </div>
            <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
                <ConversationsChat />
            </div>
        </div>
    )
}

export default Chat