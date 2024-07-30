import { supabaseClient } from './supabaseClient'

export async function loginClient(formEmail, formPwd) {
   try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
         email: formEmail,
         password: formPwd,
      })
      if (data) return data
      if (error) console.log('Server error loggin in:', error.message)
   } catch (err) {
      console.log('Error loggin in:', err.message)
   }
}

export async function registerClient(formEmail, formPwd) {
   try {
      const { data, error } = await supabaseClient.auth.signUp({
         email: formEmail,
         password: formPwd,
      })
      if (error) console.log('Server error registering user:', error.message)
      return data
   } catch (err) {
      console.log('Error registering :', err.message)
   }
}

export async function logoutClient() {
   try {
      const { data, error } = await supabaseClient.auth.signOut()
      if (data) return data
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
