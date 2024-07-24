import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import { SignUpSchema } from './FormSchema'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'
import './newForm.css'

const InputField = ({ field, label, ...props }) => (
   <div className="formFieldset">
      <div className="inputWrapperer">
         <input id={field.name} {...field} {...props} placeholder="" />
         <label htmlFor={field.name}>{label}</label>
      </div>
      <ErrorMessage component="span" name={field.name} />
   </div>
)

const handleFormSubmit = (values, onSubmitProps) => {
   setTimeout(() => {
      console.log('form enviada: ', values)
      console.log(onSubmitProps)
      //al tener la respuesta del backend
      onSubmitProps.setSubmitting(false)
   }, 1500)
}

const SignUpFormik = () => {
   const [showPassword, setShowPassword] = useState(false)

   return (
      <Formik
         initialValues={{
            nombres: '',
            apellidos: '',
            movil: '',
            email: '',
            password: '',
         }}
         validationSchema={SignUpSchema}
         onSubmit={(values, onSubmitProps) =>
            handleFormSubmit(values, onSubmitProps)
         }
      >
         {formik => (
            <Form className="newFormulario">
               {console.log(formik)}
               <Field
                  type="text"
                  name="nombres"
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
               <hr />
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
   )
}

export default SignUpFormik
