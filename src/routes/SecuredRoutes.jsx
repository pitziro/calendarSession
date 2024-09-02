import { Navigate, Outlet } from 'react-router-dom'
import useSession from '../hooks/useSession'

const SecuredRoutes = () => {
   const [isAuth, userInfo] = useSession()

   if (!isAuth) {
      return <Navigate to="/login" replace />
   }

   return <Outlet context={{ userInfo }} />
}

export default SecuredRoutes
