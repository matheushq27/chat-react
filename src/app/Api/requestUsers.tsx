import { usersType } from '../types/users'
import axios from 'axios'
const URL_SERVER = "http://localhost:3000/"



const requestUsersApi = {
    getUsers: async ()=>{
        try
        {
            let response = await axios.get(`${URL_SERVER}users`)
            return response.data
        }
        catch(error)
        {
            return error
        }
    },
    getUsersByUserName: async (userName: string)=>{
        try
        {
            let response = await axios.get(`${URL_SERVER}users/${userName}`)
            return response.data
        }
        catch(error)
        {
            return error
        }
    },
    login: async (userName: string, password: string)=>{
        try
        {
            let response = await axios.post(`${URL_SERVER}login`, {
                user: userName,
                password: password
            })
            return response.data
        }
        catch(error)
        {
            return error
        }
    },
    createUsers: async (users: usersType)=>{
        try
        {
            let response = await axios.post(`${URL_SERVER}users`, users)
            return response.data
        }
        catch(error)
        {
            return error
        }
    }
}

export default requestUsersApi