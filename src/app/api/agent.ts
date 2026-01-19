import axios, {AxiosResponse, AxiosError} from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5248/api/";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

interface ValidationError {
    errors?: { [key: string]: string[] };
    title?: string;
    status?: number;
    detail?: string;
}

axios.interceptors.response.use(
    response => {
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
                toast.error(data?.title || "Server Error");
                break;
            default:
                toast.error("An error occurred");
                break;
        }
        
        return Promise.reject(error.response);
    }
);

const requests = {  
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Catalog = {
    list: <T>() => requests.get<T>("products"),
    details: <T>(id: number) => requests.get<T>(`products/${id}`),
};

const TestErrors = {  
    get400Error: () => requests.get<any>("buggy/bad-request"),
    get401Error: () => requests.get<any>("buggy/unauthorized"),
    get404Error: () => requests.get<any>("buggy/not-found"),
    get500Error: () => requests.get<any>("buggy/server-error"),
    getValidationError: () => requests.get<any>("buggy/validation-error"),
};

const agent = {
    Catalog,
    TestErrors
};

export default agent;