import { useNavigate } from 'react-router-dom'
import { logoutClient } from '../supabase/handleClient'
import { useOutletContext } from 'react-router-dom'

const Dashboard = () => {
   const { userInfo } = useOutletContext()

   const navigate = useNavigate()

   const handleLogout = async () => {
      await logoutClient()
      navigate('/login', { replace: true })
   }

   return (
      <>
         <h1>Dashboard</h1>
         <h2>Welcome, {userInfo?.userEmail}</h2>

         <section>
            <button type="button" onClick={handleLogout}>
               Logout
            </button>
         </section>
      </>
   )
}

export default Dashboard
