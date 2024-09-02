import { supabaseClient } from './supabaseClient'

export async function loginClient(formEmail, formPwd) {
   const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: formEmail,
      password: formPwd,
   })
   if (error) throw error
   return data
}

export async function registerClient(formEmail, formPwd) {
   const { data, error } = await supabaseClient.auth.signUp({
      email: formEmail,
      password: formPwd,
   })
   if (error) throw error
   return data
}

export async function logoutClient() {
   const { error } = await supabaseClient.auth.signOut()
   if (error) throw error
   if (!error) {
      console.log('Successfully signed out')
      return { success: true }
   }
}

export async function resetUserPwd(formEmail) {
   const { data, error } =
      await supabaseClient.auth.resetPasswordForEmail(formEmail)
   if (error) throw error
   return data
}

export async function updateUserPwd(formNewPwd) {
   const { data, error } = await supabaseClient.auth.updateUser({
      password: formNewPwd,
   })
   if (error) throw error
   return data
}

export async function getClientSession() {
   try {
      const {
         data: { session },
      } = await supabaseClient.auth.getSession()
      return session
   } catch (err) {
      console.log('Error getting session:', err.message)
   }
}

export const authListener = callback => {
   const {
      data: { subscription },
   } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      console.log('evento', _event)
      callback(session)
   })
   return () => subscription.unsubscribe()
}
