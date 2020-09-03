import axios from 'axios';

const BaseUrl = 'http://127.0.0.1:3000';
// const BaseUrl = 'http://192.168.100.4:3000';
// const BaseUrl = 'http://e99e22cd.ngrok.io';


export const MakeRequest = (url, type = 'get' , data = {}, header = {}) =>{


    if(type === 'get')
    {
        return axios.get(BaseUrl+url)
            .then((response) => {
                return Promise.resolve(response.data)
            })
            .catch((err) => {
                console.log("Error - " + url + " TYPE- " + type, err);
                return Promise.reject(err);
            });
    }
    else if(type === 'post')
    {
        // console.log(BaseUrl+url);
        return axios.post(url,data)
            .then((response) => {
                console.log("Response - " + url + " TYPE- " + type);
                return Promise.resolve(response)
            })
            .catch((err) => {
                console.log("Error - " + url + " TYPE- " + type, err);
                return Promise.reject(err);
            });
    }
    else if(type === 'put')
    {
        return axios.put(BaseUrl+url,data)
            .then((response) => {
                console.log("Response - " + url + " TYPE- " + type);
                return Promise.resolve(response)
            })
            .catch((err) => {
                console.log("Error - " + url + " TYPE- " + type, err);
                return Promise.reject(err);
            });
    }
    else if(type === 'delete')
    {
        return axios.delete(BaseUrl+url)
            .then((response) => {
                console.log("Response - " + url + " TYPE- " + type);
                return Promise.resolve(response)
            })
            .catch((err) => {
                console.log("Error - " + url + " TYPE- " + type, err);
                return Promise.reject(err);
            });
    }
    else if(type === 'patch')
    {
        return axios.patch(BaseUrl+url,data)
            .then((response) => {
                console.log("Response - " + url + " TYPE- " + type);
                return Promise.resolve(response)
            })
            .catch((err) => {
                console.log("Error - " + url + " TYPE- " + type, err);
                return Promise.reject(err);
            });
    }


};
