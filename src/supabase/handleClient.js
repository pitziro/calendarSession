import { supabaseClient } from './supabaseClient'

export async function loginClient(formEmail, formPwd) {
   try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
         email: formEmail,
         password: formPwd,
      })
      return data
   } catch (error) {
      console.log('Error signing in:', error.message)
   }
}

export async function registerClient(formEmail, formPwd) {
   try {
      const { data, error } = await supabaseClient.auth.signUp({
         email: formEmail,
         password: formPwd,
      })
      console.log(data)
   } catch (error) {
      console.log('Error registering :', error.message)
   }
}

export async function logoutClient() {
   const { error } = await supabaseClient.auth.signOut()
}

export async function resetUserPwd(formEmail) {
   const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      formEmail,
      { redirectTo: 'http://localhost:5173/pwdreset' }
   )
   if (data) alert('Correo enviado')
   if (error) alert('Error en el envio')
}

export async function updateUserPwd(formNewPwd) {
   const { data, error } = await supabaseClient.auth.updateUser({
      password: formNewPwd,
   })
   if (data) {
      console.log(data)
      alert('Password updated successfully!')
      return data
   }

   if (error) alert('There was an error updating your password.')
}
