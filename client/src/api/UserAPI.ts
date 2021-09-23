import axios, {AxiosResponse} from "axios";

export function login(email: string, password: string): Promise<AxiosResponse<any>> {
    const body = {
        email: email,
        password: password
    };

    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true
    };

    return axios.post('http://localhost:8080/api/user/login', body, config)
}

export function logout(): Promise<AxiosResponse<any>> {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true
    };

    return axios.post('http://localhost:8080/api/user/logout', {}, config)
}

