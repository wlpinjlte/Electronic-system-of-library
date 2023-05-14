import axios from "axios"
const URL='http://localhost:3000/api/users'

export const registerToServer = (data) => {
    return axios.post(`${URL}/register`, data)
}

export const logInToServer = (data) => {
    return axios.post(`${URL}/login`, data)
}

export const refreshTokenToServer = () => {
    return axios.post(`${URL}/refresh-token`)
}