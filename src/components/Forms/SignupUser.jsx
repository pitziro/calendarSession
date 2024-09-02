import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { SignUpSchema } from './FormSchema'

import { registerClient } from '../../supabase/handleClient'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'
import InputField from './CustomInputField'
import './newForm.css'

const SignUpFormik = () => {
   const [showPassword, setShowPassword] = useState(false)

   const handleFormSubmit = async (values, onSubmitProps) => {
      const res = await registerClient(values.email, values.password)
      console.log('form enviada: ', values)
      console.log(res)
      //TODO: handle los errores qué pasa cuando hay mensajes de error

      onSubmitProps.setSubmitting(false)
   }

   const initialFormVales = {
      nombres: '',
      apellidos: '',
      movil: '',
      email: '',
      password: '',
   }
   return (
      <div className="formContainer">
         <Formik
            initialValues={initialFormVales}
            validationSchema={SignUpSchema}
            onSubmit={(values, onSubmitProps) =>
               handleFormSubmit(values, onSubmitProps)
            }
         >
            {formik => (
               <Form className="newFormulario">
                  <Field
                     name="nombres"
                     type="text"
                     label="Nombres"
                     component={InputField}
                  />

                  <Field
                     type="text"
                     name="apellidos"
                     label="Apellidos"
                     component={InputField}
                  />
                  <Field
                     type="text"
                     name="movil"
                     label="Telefono"
                     component={InputField}
                  />
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
                     Registrarme
                  </button>
               </Form>
            )}
         </Formik>

         <section className="sFormLinks">
            ¿Ya tienes una cuenta? Logueate&nbsp;
            <Link to="/login">aqui</Link>
         </section>
      </div>
   )
}

export default SignUpFormik
