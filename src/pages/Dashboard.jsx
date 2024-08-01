import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUserInfoStore } from '../context/clientStore'
import {
   logoutClient,
   getClientSession,
   authListener,
} from '../supabase/handleClient'

const Dashboard = () => {
   const userInfo = useUserInfoStore(state => state.userInfo)
   const isAuth = useUserInfoStore(state => state.isAuth)
   const setIsAuth = useUserInfoStore(state => state.setIsAuth)
   const emptyUserInfo = useUserInfoStore(state => state.emptyUserInfo)
   // const setUserInfo = useUserInfoStore(state => state.setUserInfo)

   useEffect(() => {
      const handleAuthChange = session => {
         if (session) {
            setIsAuth(true)
            // maneja la actualizacion de datos que usemos en pantalla
         } else {
            setIsAuth(false)
            emptyUserInfo()
         }
      }

      const initializeSession = async () => {
         const session = await getClientSession()
         handleAuthChange(session)
      }
      initializeSession()

      const unsubscribe = authListener(handleAuthChange)

      return () => {
         unsubscribe()
         console.log('unmounted')
      }
   }, [setIsAuth, emptyUserInfo])

   return (
      <>
         {isAuth ? (
            <DashboardDetail userInfo={{ ...userInfo }} />
         ) : (
            <NotLogged />
         )}
      </>
   )
}
export default Dashboard

const NotLogged = () => {
   return (
      <>
         <pre> Debes estar logueado </pre>
         <section className="sFormLinks">
            ¿Ya tienes una cuenta? Logueate&nbsp;
            <Link to="/login">aqui</Link>
         </section>
      </>
   )
}

const DashboardDetail = ({ userInfo }) => {
   const navigate = useNavigate()

   const handleLogout = async () => {
      await logoutClient()
      navigate('/login')
   }

   return (
      <div>
         <h1>Dashboard</h1>
         {userInfo.userEmail}
         <br />

         <section>
            <button type="button" onClick={handleLogout}>
               Logout
            </button>
         </section>
      </div>
   )
}
