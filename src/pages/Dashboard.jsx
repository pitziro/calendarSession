import { useClientStore } from '../context/clientStore'
import { logoutClient } from '../supabase/handleClient'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
   const navigate = useNavigate()
   const client = useClientStore(state => state.client)
   const emptyClient = useClientStore(state => state.emptyClient)

   const handleLogout = async () => {
      if (client.userId) {
         const res = await logoutClient()
         console.log(res)
         emptyClient()
         navigate('/login')
      }
   }
   if (!client.userEmail)
      return (
         <>
            <pre> Debes estar logueado </pre>
            <section className="sFormLinks">
               ¿Ya tienes una cuenta? Logueate&nbsp;
               <Link to="/login">aqui</Link>
            </section>
         </>
      )

   useEffect(() => {
      //funcion para conseguir los datos del cliente
   }, [client])

   return (
      <div>
         <h1>Dashboard</h1>
         {client.userEmail}
         <br />

         <section>
            <button type="button" onClick={handleLogout}>
               Logout
            </button>
         </section>
      </div>
   )
}

export default Dashboard
