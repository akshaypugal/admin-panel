import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Ensure VITE_API_URL is set in .env file

export const getProduct = async (id?: string) => {
    const url = id ? `${API_URL}/${id}` : API_URL;
    return await axios.get(url);
};

export const addProduct = async (formData: FormData) => {
    return await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateProduct = async (id: string, formData: FormData) => {
    return await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteProduct = async (id: string) => {
    return await axios.delete(`${API_URL}/${id}`);
};
