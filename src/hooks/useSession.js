import { useEffect } from 'react'
import { authListener, getClientSession } from '../supabase/handleClient'
import { useUserInfoStore } from '../context/clientStore'

const useSession = () => {
   const userInfo = useUserInfoStore(state => state.userInfo)
   const isAuth = useUserInfoStore(state => state.isAuth)
   const setIsAuth = useUserInfoStore(state => state.setIsAuth)
   const emptyUserInfo = useUserInfoStore(state => state.emptyUserInfo)
   const setSessionToken = useUserInfoStore(state => state.setSessionToken)

   const initializeSession = async () => {
      const session = await getClientSession()
      handleAuthChange(session)
   }

   const handleAuthChange = session => {
      if (session) {
         setIsAuth(true)
         // actualizacion de datos de usuario fetched
         // aqui de algun modo tengo que capturar cuando sea primer login
      } else {
         setIsAuth(false)
         emptyUserInfo()
         setSessionToken('')
      }
   }

   useEffect(() => {
      initializeSession()
      const unsuscribe = authListener(handleAuthChange)

      return () => {
         unsuscribe()
      }
   }, [])

   return [isAuth, userInfo]
}

export default useSession
