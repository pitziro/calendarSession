import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { SignInSchema } from './FormSchema'
import { updateUserPwd } from '../../supabase/handleClient'
import { useNavigate } from 'react-router-dom'
import InputField from './CustomInputField'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'

function PwdReset() {
   const [showPassword, setShowPassword] = useState(false)
   const navigate = useNavigate()

   const handleFormSubmit = async (values, onSubmitProps) => {
      const data = await updateUserPwd(values.email)
      console.log(data)
      onSubmitProps.setSubmitting(false)
      navigate('/login')
   }

   const InitialFormVales = {
      password: '',
   }

   return (
      <div className="formContainer">
         <Formik
            initialValues={InitialFormVales}
            // validationSchema={SignInSchema}
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
