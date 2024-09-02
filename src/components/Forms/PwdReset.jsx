import { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { newPwdSchema } from './FormSchema'
import { updateUserPwd } from '../../supabase/handleClient'
import { useNavigate, useLocation } from 'react-router-dom'
import InputField from './CustomInputField'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'

function PwdReset() {
   const [showPassword, setShowPassword] = useState(false)
   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search)
      const tokenFromUrl = queryParams.get('token')

      if (!tokenFromUrl) {
         console.log('no token detected')
         navigate('/pwdrecover', { replace: true })
      }
   }, [])

   const handleFormSubmit = async (values, onSubmitProps) => {
      try {
         const { data, error } = await updateUserPwd(values.password)
         if (error) throw error
         console.log(data)
         navigate('/login', { replace: true })
      } catch (err) {
         console.log('Error: ', err)
         // handle los errores qué pasa cuando hay mensajes de error
      } finally {
         onSubmitProps.setSubmitting(false)
      }
   }

   const InitialFormVales = {
      password: '',
   }

   return (
      <div className="formContainer">
         <Formik
            initialValues={InitialFormVales}
            validationSchema={newPwdSchema}
            onSubmit={handleFormSubmit}
         >
            {formik => (
               <Form className="newFormulario">
                  <h2> Ingresa tu nueva contraseña</h2>

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
                     Confirmar
                  </button>
               </Form>
            )}
         </Formik>
      </div>
   )
}

export default PwdReset
