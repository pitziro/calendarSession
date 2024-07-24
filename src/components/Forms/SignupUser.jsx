import { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import SignupSchema from '../../components/Forms/FormSchema'
import eyeSvg from '../../assets/eye.svg'
import '../../App.css'

const InputField = ({ field, form: { touched, errors }, label, ...props }) => (
   <div className="formField">
      <div className="inputWrapper">
         <input {...field} {...props} placeholder="" />
         <label htmlFor={field.name}>{label}</label>
      </div>
      {touched[field.name] && errors[field.name] && (
         <span className="errorDetail">{errors[field.name]}</span>
      )}
   </div>
)

const SignUpForm = () => {
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
            <Form className="formulario">
               <div className="formField">
                  <label htmlFor="nombres">Nombres</label>
                  <Field
                     type="text"
                     name="nombres"
                     placeholder="John"
                     className={
                        touched.nombres && errors.nombres ? 'inputError' : ''
                     }
                  />
               </div>
               {touched.nombres && errors.nombres && (
                  <span className="errorDetail">{errors.nombres}</span>
               )}

               <div className="formField">
                  <label htmlFor="nombres">Apellidos</label>
                  <Field
                     type="text"
                     name="apellidos"
                     placeholder="Doe"
                     className={
                        touched.apellidos && errors.apellidos
                           ? 'inputError'
                           : ''
                     }
                  />
               </div>
               {touched.apellidos && errors.apellidos && (
                  <span className="errorDetail">{errors.apellidos}</span>
               )}
               <div className="formField">
                  <label htmlFor="nombres">Móvil</label>
                  <Field
                     type="text"
                     name="movil"
                     placeholder="999666333 "
                     className={
                        touched.movil && errors.movil ? 'inputError' : ''
                     }
                  />
               </div>
               {touched.movil && errors.movil && (
                  <span className="errorDetail">{errors.movil}</span>
               )}
               {/* <Field
                  name="email"
                  type="email"
                  placeholder="pepito@gmail.com"
                  className={touched.email && errors.email ? 'inputError' : ''}
               />
               {touched.email && errors.email && (
                  <span className="errorDetail">{errors.email}</span>
               )} */}
               <Field
                  name="email"
                  type="email"
                  label="Email"
                  component={InputField}
               />
               <div className="fieldPassword">
                  <label htmlFor="password">Password</label>
                  <Field
                     name="password"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     className={
                        touched.password && errors.password ? 'inputError' : ''
                     }
                  />
                  <img
                     src={eyeSvg}
                     alt="Mostrar contraseña"
                     onMouseDown={() => setShowPassword(true)}
                     onMouseUp={() => setShowPassword(false)}
                     onMouseLeave={() => setShowPassword(false)}
                  />
               </div>

               {touched.password && errors.password && (
                  <span className="errorDetail">{errors.password}</span>
               )}
               <button disabled={isSubmitting} type="submit">
                  Registrarme
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default SignUpForm
