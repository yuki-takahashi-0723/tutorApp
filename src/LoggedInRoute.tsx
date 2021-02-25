import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './AuthSearvis'
type Props = {
    component : any,
    path : string
}
const LoggedInRoute:React.FC<Props> = ({component:Component,...rest}) => {
    const user = useContext(AuthContext)
  
    return(
        <Route
            {...rest}
            render={props=>
                (user.crrentUser !== null) ? (
                    <Component {...props}/>
                ):(
                    <Redirect to={'/signin'}/>
                )
            }
        
        />
    )
}

export default LoggedInRoute