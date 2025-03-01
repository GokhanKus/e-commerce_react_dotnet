import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

axios.defaults.baseURL = "http://localhost:5018/api/";
// Bu ayar, axios isteklerinde cookies, authorization headers, SSL client certificates gibi kimlik doğrulama bilgilerini içermesine olanak tanır.
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response => {
    return response;

}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {

        case HttpStatusCode.BadRequest.valueOf():
            if (data.errors) {
                const modelErrors: string[] = [];
                for (const key in data.errors) {
                    modelErrors.push(data.errors[key]);
                }
                throw modelErrors;
            }
            toast.error(data.title);
            break;
        case HttpStatusCode.Unauthorized.valueOf():
            toast.error(data.title);
            break;
        case HttpStatusCode.NotFound.valueOf():
            router.navigate("/not-found");
            break;
        case HttpStatusCode.InternalServerError.valueOf():
            router.navigate("/server-error", { state: { error: data, status: status } });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const Errors = {
    getBadRequestError: () => queries.get("/error/bad-request"),
    getUnauthorizedError: () => queries.get("/error/unauthorized"),
    getNotFoundError: () => queries.get("/error/not-found"),
    getServerError: () => queries.get("/error/server-error"),
    getValidationError: () => queries.get("/error/validation-error"),
}

const queries = {
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) => axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data),
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`)
}

const Cart = {
    //request URL'lerimiz;
    get: () => queries.get("cart"),
    addItem: (productId: Number, quantity = 1) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: Number, quantity = 1) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`)
}
const Account = {
    login: (formData: any) => queries.post("account/login", formData),
    register: (formData: any) => queries.post("account/register", formData),
}
const requests = {
    Catalog, Errors, Cart, Account
}

export default requests