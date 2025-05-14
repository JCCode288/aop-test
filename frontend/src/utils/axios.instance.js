import axios from "axios";

const Axios = axios.create({
   baseURL: process.env.REACT_APP_PLACEHOLDER_URL,
});

// add interceptors as you'd like
Axios.interceptors.request.use((req) => {
   return req;
});

Axios.interceptors.response.use((res) => {
   return res;
});

export default Axios;
