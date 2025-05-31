// import axios from "axios";

// const axiosMultipartInstance = axios.create({

//   baseURL: "http://hybrid.srishticampus.in/legal_liaison_api/",

//   baseURL:  "http://localhost:4060/legal_advisor_api/",

//   headers: {
//     "Content-Type": "multipart/form-data", 
//   },
// });

// export default axiosMultipartInstance;

import axios from "axios";

const axiosMultipartInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosMultipartInstance;
