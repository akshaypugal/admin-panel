import axios from 'axios'

const API_URL = 'http://localhost:5000/products'


export const getProduct = async () =>{
    return await axios.get('http://localhost:5000/products');
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