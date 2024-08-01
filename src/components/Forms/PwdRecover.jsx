import { Field, Form, Formik } from 'formik'
import { emailPwdResetSchema } from './FormSchema'
import InputField from './CustomInputField'
import { resetUserPwd } from '../../supabase/handleClient'
import { Link } from 'react-router-dom'

function PwdRecover() {
   const handleFormSubmit = async (values, onSubmitProps) => {
      const res = await resetUserPwd(values.email)
      console.log('form enviada: ', values)
      console.log(res)

      // handle los errores qué pasa cuando hay mensajes de error
      // esto deberia llevar a otra pagina, tal vez la de login con un mensaje de exito o error
      onSubmitProps.setSubmitting(false)
   }

   const InitialFormVales = {
      email: '',
   }

   return (
      <div className="formContainer">
         <Formik
            initialValues={InitialFormVales}
            validationSchema={emailPwdResetSchema}
            onSubmit={handleFormSubmit}
         >
            {formik => (
               <Form className="newFormulario">
                  <h2>Recuperar contraseña</h2>
                  <Field
                     name="email"
                     type="email"
                     label="Email"
                     component={InputField}
                  />

                  <button
                     className="sendBtn"
                     disabled={!formik.isValid || formik.isSubmitting}
                     type="submit"
                  >
                     Enviar
                  </button>
               </Form>
            )}
         </Formik>
         <p className="sFormLinks">
            ¿Ya tienes una cuenta? &nbsp;<Link to="/login">Inicia sesión</Link>
         </p>
      </div>
   )
}

export default PwdRecover
