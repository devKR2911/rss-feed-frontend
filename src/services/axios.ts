import axios from "axios";
import { API_BASE_URL } from './const';

export const httpGet = (url) => axios.get(`${API_BASE_URL}${url}`);

export const httpPost = (url, body) => axios.post(`${API_BASE_URL}${url}`, body);

export const httpPut = (url, body) => axios.put(`${API_BASE_URL}${url}`, body);
