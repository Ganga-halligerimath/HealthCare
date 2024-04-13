/*eslint-disable react/proptypes */
import {useContext} from 'react'
import { Navigate} from 'react-router-dom'
import { authContext } from '../context/AuthContext'

const ProtectedRoute = ({children, allowedRoles}) => {



    const{token, role} = useContext(authContext)
    
    const isAllowed =allowedRoles.includes(role)
    const accessibleRoute  = token && isAllowed ? children : <Navigate to='/login' replace={true}/>
    // const accessibleRoute1  = token && isAllowed ? children : <Navigate to='/users/profile/me' replace={true}/>


  return accessibleRoute;
}

export default ProtectedRoute;