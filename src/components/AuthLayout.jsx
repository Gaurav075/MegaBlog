import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {

    const navigate = useNavigate()
    const [loader,setloader] = useState(true)
    const authstatus = useSelector(state=>state.auth.status)

    useEffect(()=>{
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
        if(authentication && authstatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authstatus!==authentication){
            navigate("/")
        }
        setloader(false)
    },[authstatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}


