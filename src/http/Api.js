import axios from "axios"
export default{
    callApi(){
        let call = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/',
            timeout: 60 * 4 * 1000,
        });

        return call;
    }
    
}