import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [product_list,setProductList] = useState([])

    const fetchProductList = async () => {
        const response = await axios.get(url+"/api/product/list")
        setProductList(response.data.data)
    }

    useEffect(() =>{
        async function loadData() {
            await fetchProductList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        product_list,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;