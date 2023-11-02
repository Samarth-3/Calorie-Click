import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDIyMzIyZGQ0NGUzNGZkNDYwNjA5MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5ODgzMzczOSwiZXhwIjoxNjk5MjY1NzM5fQ.xXgR2M-x_UmtgcjCqxyr9W_Oc0DHirEd27nEkfV7ilw"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: {TOKEN} },
  });
