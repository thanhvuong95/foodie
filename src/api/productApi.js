import axiosClient from "./axios"

const productApi = {
    getAll: (type, params) => {
        return axiosClient.get(type, { params });
    },
    getById:(id) => {
        const url = `products/${id}`
        return axiosClient.get(url) 
    }
}
export default productApi