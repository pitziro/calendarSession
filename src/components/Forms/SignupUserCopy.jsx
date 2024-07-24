import { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import SignupSchema from './FormSchema'
import eyeOpen from '../../assets/eye.svg'
import eyeShut from '../../assets/eyeshut.svg'
import './newForm.css'

const InputField = ({ field, form: { touched, errors }, label, ...props }) => (
   <div className="formFieldset">
      <div className="inputWrapperer">
         <input {...field} {...props} placeholder="" />
         <label htmlFor={field.name}>{label}</label>
      </div>
      {touched[field.name] && errors[field.name] && (
         <span className="errorDetail">{errors[field.name]}</span>
      )}
   </div>
)

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
         validationSchema={SignupSchema}
         onSubmit={values => {
            console.log('Formulario enviado')
            console.log(values)
         }}
      >
         {({ errors, touched, isSubmitting }) => (
            <Form className="newFormulario">
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

               <button disabled={isSubmitting} type="submit">
                  Registrarme
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default SignUpFormik
