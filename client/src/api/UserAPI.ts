import axios, {AxiosResponse} from "axios";

export const userAPI = {
    login,
    logout,
    isAuthenticated,
    sendRecovery,
    validatePasswordRecoveryToken,
    updatePassword,
    getAllUsers,
    createUser
}

let defaultConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true
}

function login(email: string, password: string, rememberUser: boolean = false): Promise<AxiosResponse> {
    const body = { email, password, rememberUser};
    return axios.post('http://localhost:8080/api/user/login', body, defaultConfig)
}

function logout(): Promise<AxiosResponse> {
    return axios.post('http://localhost:8080/api/user/logout', {}, defaultConfig)
}

function isAuthenticated(): Promise<AxiosResponse<{ isAuth: boolean, userId: string}>>{
    return axios.post('http://localhost:8080/api/user/auth', {}, defaultConfig)
}

function sendRecovery(email: string): Promise<AxiosResponse<{ data: { error: boolean, message: string, previewUrl: string }}>> {
    const config = {...defaultConfig, params: { email: email }}
    return axios.get('http://localhost:8080/api/password-reset', config)
}

function validatePasswordRecoveryToken(userId: string, token: string): Promise<AxiosResponse< { data: { error: boolean, message: string }}>> {
    const config = {...defaultConfig, params: { userId, token }}
    return axios.get('http://localhost:8080/api/password-reset/:userId/:token', config)
}

function updatePassword(password: string, userId: string, token: string): Promise<AxiosResponse> {
    const body = { password }
    const config = {...defaultConfig, params: { userId, token }}
    return axios.post('http://localhost:8080/api/password-reset/:userId/:token', body, config)
}

function getAllUsers(): Promise<AxiosResponse> {
    return axios.get('http://localhost:8080/api/user/all', defaultConfig)
}

function createUser(email: string, firstName: string, lastName: string, building: string, password: string, phoneNumber: string, role: string){
    const body = { email, firstName, lastName, building, password, phoneNumber, role }
    return axios.post('http://localhost:8080/api/user', body, defaultConfig)
}

