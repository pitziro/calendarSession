import { useEffect, useState } from 'react'
import { supabaseClient } from './supabaseClient'

const useSupabaseSession = () => {
   const [session, setSession] = useState(null)

   useEffect(() => {
      const fetchSession = async () => {
         const { data } = await supabaseClient.auth.getSession()
         if (data?.session) {
            setSession(data.session)
         }
         fetchSession()

         // // Subscribe to auth state changes
         // const { data: subscription } = supabase.auth.onAuthStateChange(
         //    (event, session) => {
         //       if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
         //          setSession(session)
         //       } else if (event === 'SIGNED_OUT') {
         //          setSession(null)
         //       }
         //    }
         // )

         // // Cleanup subscription on unmount
         // return () => {
         //    subscription.unsubscribe()
         // }
      }
   }, [])

   return session
}

export default useSupabaseSession
