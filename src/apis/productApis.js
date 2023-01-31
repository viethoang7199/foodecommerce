import axiosClient from './axiosClient';
const productApis = {
    getAll: async () => {
        try {
            const response = await axiosClient.get('/products');
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getProductDetails: async (productId) => {
        try {
            const response = await axiosClient.get(`/products/${productId}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
}

export default productApis;