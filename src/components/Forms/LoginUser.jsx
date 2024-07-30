import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { SignInSchema } from './FormSchema'
import { loginClient } from '../../supabase/handleClient'

import { useClientStore } from '../../context/clientStore'
import InputField from './CustomInputField'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'
import './newForm.css'

const LoginForm = () => {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const setClient = useClientStore(state => state.setClient)

   const handleLogin = async (values, onSubmitProps) => {
      const logged = await loginClient(values.email, values.password)
      const { email, id } = logged.user
      const { access_token } = logged.session
      console.log(logged)
      setClient(email, id, access_token)
      navigate('/dashboard', { replace: true })

      // handle los errores qué pasa cuando hay mensajes de error
      onSubmitProps.setSubmitting(false)
   }

   const InitialFormValues = { email: '', password: '' }
   return (
      <>
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
