import axios from "axios"

const BaseURL = 'https://od1ss7mik1.execute-api.ap-southeast-1.amazonaws.com'

const ProductAPI = {
    getProducts: async () => {
        const response = await axios.get(`${BaseURL}/products`)
        return response.data
    },
    getProductDetail: async (id) => {
        const response = await axios.get(`${BaseURL}/products/${id}`)
        return response.data
    },
    getCategories: async () => {
        const response = await axios.get(`${BaseURL}/products/categories`)
        return response.data
    },
}

export default ProductAPI