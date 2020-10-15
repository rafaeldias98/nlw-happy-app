import axios from 'axios';

const orphanageApi = axios.create({
  baseURL: process.env.REACT_APP_ORPHANAGE_API_BASE_URL
})

export default orphanageApi;
