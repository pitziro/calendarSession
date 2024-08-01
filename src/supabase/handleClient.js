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
   try {
      const { data, error } = await supabaseClient.auth.signUp({
         email: formEmail,
         password: formPwd,
      })
      if (data) return data
      if (error) console.log('Server error registering user:', error.message)
   } catch (err) {
      console.log('Error registering :', err.message)
   }
}

export async function logoutClient() {
   try {
      const { error } = await supabaseClient.auth.signOut()
      if (!error) {
         console.log('Successfully signed out')
         return { success: true }
      }

      if (error) console.log('Server error signing out:', error.message)
   } catch (err) {
      console.log('Error signing out :', err.message)
   }
}

export async function resetUserPwd(formEmail) {
   try {
      const { data, error } =
         await supabaseClient.auth.resetPasswordForEmail(formEmail)
      if (data) return data
      if (error) console.log('Server error sending re-pwd:', error.message)
   } catch (err) {
      console.log('Error sending re-pwd:', err.message)
   }
}

export async function updateUserPwd(formNewPwd) {
   try {
      const { data, error } = await supabaseClient.auth.updateUser({
         password: formNewPwd,
      })
      if (data) return data
      if (error) console.log('Server error reseting pwd:', error.message)
   } catch (err) {
      console.log('Error updating password:', err.message)
   }
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
