// import { useState } from 'react';
// import axios from 'axios';
//
// const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//
//   const makeRequest = async (method, url, data = null) => {
//     setLoading(true);
//     setError(null);
//
//     try {
//       const response = await axios.request({
//         method,
//         url,
//         data,
//       });
//       return response.data;
//     } catch (error) {
//       setError(error);
//       throw error; // Rethrow the error for the caller to handle
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const get = async (url) => {
//     return makeRequest('GET', url);
//   };
//
//   const post = async (url, data) => {
//     return makeRequest('POST', url, data);
//   };
//
//   // Add more methods (e.g., put, delete) as needed
//
//   return { loading, error, get, post };
// };
//
// export default useApi;
