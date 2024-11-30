
import Cookies from 'js-cookie'

import { Navigate } from 'react-router-dom'

const ProtectedRoute=({children})=>{
    const AccessToken=Cookies.get('jwt_token')
    return AccessToken ? children: <Navigate to='/login' />

}

export default ProtectedRoute