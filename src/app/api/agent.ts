import axios, {AxiosResponse, AxiosError} from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5248/api/";
axios.defaults.withCredentials = true;


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

interface ValidationError {
    errors?: { [key: string]: string[] };
    title?: string;
    status?: number;
    detail?: string;
}

axios.interceptors.response.use(
    async response => {
        await sleep();
        return response;
    }, 
    (error: AxiosError<ValidationError>) => {
        console.log('Error caught:', error);
        console.log('Error response:', error.response);
        
        if (!error.response) {
            toast.error("Network error - please check your connection");
            return Promise.reject(error);
        }
        
        const {data, status} = error.response;
        console.log('Status:', status);
        console.log('Data:', data);
        
        switch (status) {
            case 400:
                if (data?.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(...data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data?.title || "Bad Request");
                break;
            case 401:
                toast.error(data?.title || "Unauthorized");
                break;
            case 404:
                toast.error(data?.title || "Not Found");
                break;
            case 500:
                history.push(
                    {
                        pathname: "/server-error",
                        state: {error: data}
                    }
                );
                break;
            default:
                toast.error("An error occurred");
                break;
        }
        
        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)
}


const agent = {
    Catalog,
    TestErrors,
    Basket
};

export default agent;