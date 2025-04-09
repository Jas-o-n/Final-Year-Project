import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = import.meta.env.VITE_API_URL
    const adminUrl = import.meta.env.VITE_ADMIN_URL
    const [token,setToken] = useState("")
    const [product_list,setProductList] = useState([])
    const [providers, setProviders] = useState([])

    const fetchProductList = async () => {
        const response = await axios.get(url+"/api/product/list")
        setProductList(response.data.data)
    }

    const fetchProviders = async () => {
        const response = await axios.get(url+"/api/provider/list")
        setProviders(response.data.data)
    }

    useEffect(() =>{
        async function loadData() {
            await fetchProductList()
            await fetchProviders()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        product_list,
        providers,
        url,
        token,
        setToken,
        adminUrl
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;