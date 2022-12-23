import SidebarChats from "./partials/SidebarChats"
import ConversationsChat from "./partials/ConversationsChat"
import { useAuth } from "../../../modules/auth"
import {usersTypeFriend} from '../../../types/users'
import {io} from 'socket.io-client'
import { useEffect, useState } from "react"
const socket = io('http://localhost:3000', { transports : ['websocket'] })


function Chat(){

    const {saveAuth, setCurrentUser, auth, currentUser} = useAuth()
    const [friends, setFriends] = useState<usersTypeFriend[]>()
    const [updateFriends, setUpdateFriends] = useState(false)

    
    
    function onlineUserList(){
        socket.on('user-ok', (list)=>{
            setFriends(list)
            console.log(list)
        })
    }

    function listUpdate(){
        socket.on('list-update', (data)=>{
            setFriends(data.list)
        })
    }

    function joinRequest(){
        socket.emit('join-request', currentUser)
    }

    useEffect(()=>{
        joinRequest()
    }, [])

    useEffect(()=>{
        onlineUserList()
        listUpdate()
    }, [friends])

    return(
        <div className="d-flex flex-column flex-lg-row">
            <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
                <SidebarChats users={friends}/>
            </div>
            <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
                <ConversationsChat />
            </div>
        </div>
    )
}

export default Chat