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
    getProductVariations: async () => {
        const response = await axios.get(`${BaseURL}/products/product-variation-data`)
        return response.data
    },
    getProductVariationOptions: async () => {
        const response = await axios.get(`${BaseURL}/products/product-variation-options-data`)
        return response.data
    },
    getProductSkus: async () => {
        const response = await axios.get(`${BaseURL}/products/product-skus-data`)
        return response.data
    },
    getProductSkuOptions: async () => {
        const response = await axios.get(`${BaseURL}/products/product-sku-options-data`)
        return response.data
    }
}

export default ProductAPI