import axios from "axios";

export const axiosInstens=axios.create({
    baseURL:import.meta.env.MODE=="developement"?"http://localhost:8080/api":"/api",
    withCredentials:true,
})
"http://localhost:8080/api"