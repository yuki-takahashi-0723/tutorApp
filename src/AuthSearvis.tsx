
import React, { createContext, useEffect, useState } from 'react'
import {User} from '@firebase/auth-types'
import { auth } from './firebase/config'


interface IAuthContext {
    crrentUser : User | null | undefined
}

const AuthContext = createContext<IAuthContext>({crrentUser: undefined})

const AuthProvider = ({children}:any) => {
    const [user,setUser]=useState<User | null | undefined>(undefined)
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            setUser(user)
        })
    },[])
    return(
        <AuthContext.Provider value={{crrentUser : user}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}


