import axios from "axios";
import { API_HOST } from "../constants";

const baseUrl = `${API_HOST}/api`;

const axiosInstance = axios.create();

export const addUser = async (data) => {
    return await axiosInstance.post(`${baseUrl}/create`, data);
};

export const getAllUser = async () => {
    return await axiosInstance.get(`${baseUrl}/getAll`);
};

export const updateUser = async (id, data) => {
    return await axiosInstance.put(`${baseUrl}/update/${id}`, data);
};

export const deleteUser = async (id) => {
    return await axiosInstance.delete(`${baseUrl}/delete/${id}`);
};