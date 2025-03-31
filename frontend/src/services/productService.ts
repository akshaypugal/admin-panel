import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config()
const API_URL = process.env.URL
export const getProduct = async () =>{
    return await axios.get(`${API_URL}`);
}


export const addProduct = async (formdata : FormData) =>{
    return await axios.post(API_URL , formdata , {
        headers: {'Content-Type' : 'multipart/form-data'},
    });
};

export const updateProduct = async (id:string , formdata: FormData) =>{
    return await axios.put(`${API_URL}/${id}`,formdata,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        },
    });
};

export const deleteProduct = async (id : string) =>{
    return await axios.delete(`${API_URL}/${id}`);
};