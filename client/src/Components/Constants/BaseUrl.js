// import axios from 'axios';

// const axiosInstance = axios.create({

//   server api
  
//   baseURL: 'http://hybrid.srishticampus.in:4043/legal_liaison_api/', 

// local api

// baseURL: 'http://localhost:4060/legal_advisor_api/', 

//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance


import axios from "axios";

const axiosMultipartInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosMultipartInstance;