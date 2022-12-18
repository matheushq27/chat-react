import axios from 'axios'
const URL_SERVER = "http://localhost:3000/"

type users = {
    user: string
    name: string
    surname: string
    email: string
    password: string
}


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
    createUsers: async (users: users)=>{
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