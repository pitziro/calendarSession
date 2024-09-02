import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { toast } from 'react-toastify'

import { SignInSchema } from './FormSchema'
import { loginClient } from '../../supabase/handleClient'
import { useUserInfoStore } from '../../context/clientStore'
import FormToast from './FormToast'

import InputField from './CustomInputField'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'
import './newForm.css'

const LoginForm = () => {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)

   const setUserInfo = useUserInfoStore(state => state.setUserInfo)
   const setIsAuth = useUserInfoStore(state => state.setIsAuth)
   const setSessionToken = useUserInfoStore(state => state.setSessionToken)
   const isAuth = useUserInfoStore(state => state.isAuth)

   // por si entra directamente al link
   useEffect(() => {
      if (isAuth) navigate('/dashboard', { replace: true })
   }, [isAuth])

   const callToaster = pErrorMsg => {
      toast.error(pErrorMsg, {
         className: 'myToastContainerErr',
         bodyClassName: 'myToastBodyErr',
      })
   }

   console.log('render login')

   const handleLogin = async (values, onSubmitProps) => {
      try {
         const logged = await loginClient(values.email, values.password)
         const { email, id } = logged.user
         const { access_token } = logged.session
         setUserInfo(email, id)
         setSessionToken(access_token)
         setIsAuth(true)
         navigate('/dashboard', { replace: true })
      } catch (err) {
         let errorMessage = 'Error! Por favor, intenta de nuevo más tarde.'
         if (err.message) {
            switch (err.message) {
               case 'Invalid login credentials':
                  errorMessage = 'Por favor, verifica tu email y contraseña.'
                  break
               case 'Email not confirmed':
                  errorMessage = 'El correo no ha sido confirmado.'
                  break
               default:
                  errorMessage = err.message
            }
            callToaster(errorMessage)
         }
      } finally {
         onSubmitProps.setSubmitting(false)
      }
   }

   const InitialFormValues = { email: '', password: '' }
   return (
      <>
         <FormToast />
         <Formik
            initialValues={InitialFormValues}
            validationSchema={SignInSchema}
            onSubmit={(values, onSubmitProps) =>
               handleLogin(values, onSubmitProps)
            }
         >
            {formik => (
               <Form className="newFormulario">
                  <Field
                     name="email"
                     type="email"
                     label="Email"
                     component={InputField}
                  />
                  <div className="fieldPassword">
                     <Field
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        component={InputField}
                     />
                     <img
                        role="alert"
                        src={!showPassword ? eyeOpen : eyeShut}
                        alt="Mostrar contraseña"
                        onClick={() => setShowPassword(!showPassword)}
                     />
                  </div>
                  <button
                     className="sendBtn"
                     disabled={!formik.isValid || formik.isSubmitting}
                     type="submit"
                  >
                     Login
                  </button>
               </Form>
            )}
         </Formik>

         <section className="sFormLinks">
            ¿Olvidaste tu contraseña? Recupérala&nbsp;
            <Link to="/pwdrecover">aqui</Link>
         </section>

         <section className="sFormLinks">
            ¿No tienes una cuenta? Genera una &nbsp;
            <Link to="/signup">aqui</Link>
         </section>
      </>
   )
}

export default LoginForm
