import config from "../config";
import HTTPService from "./HTTPService";

const ENDPOINT_LOGIN = "/users/login";
const ENDPOINT_CHECK_TOKEN = "/hello/world";
const KEY_LOCAL_STORAGE_TOKEN = "TOKEN";

const login = ({ email, password }) => {
    return HTTPService.post(`${config.BASE_URL}${ENDPOINT_LOGIN}`, {
        email,
        password,
    }
    );
};

const tokenVerify = async () => {
    try {
        let token = getToken();
        if (token) {
            const result = await HTTPService.post(`${config.BASE_URL}${ENDPOINT_CHECK_TOKEN}`,
                {},
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

const saveToken = (token) => {
    localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, token);
};

const getToken = () => {
    return localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
};

const AuthService = {
    login,
    tokenVerify,
    getToken,
    saveToken,
};

export default AuthService;