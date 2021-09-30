import axios, {AxiosResponse} from "axios";

export const userAPI = {
    login,
    logout,
    isAuthenticated
}

function login(email: string, password: string, rememberUser: boolean = false): Promise<AxiosResponse<any>> {
    const body = { email, password, rememberUser};

    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true
    };

    return axios.post('http://localhost:8080/api/user/login', body, config)
}

function isAuthenticated(): Promise<AxiosResponse<{ isAuth: boolean, userId: string}>>{
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true
    };

    return axios.post('http://localhost:8080/api/user/auth', {}, config)
}

function logout(): Promise<AxiosResponse<any>> {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true
    };

    return axios.post('http://localhost:8080/api/user/logout', {}, config)
}

