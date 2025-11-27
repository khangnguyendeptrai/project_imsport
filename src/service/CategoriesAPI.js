import axios from "axios"

import BaseUrl from "./BaseUrl";

const CategoryAPI={
    getCategory : async () =>{
        const respose = await axios.get(`${BaseUrl}/products/categories`)
        return respose.data
    }
}
export default CategoryAPI;