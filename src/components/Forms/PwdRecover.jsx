import { Field, Form, Formik } from 'formik'
import { SignInSchema } from './FormSchema'
import InputField from './CustomInputField'
import { resetUserPwd } from '../../supabase/handleClient'

function PwdRecover() {
   const handleFormSubmit = (values, onSubmitProps) => {
      resetUserPwd(values.email).then(res => {
         console.log(res)
      })
      console.log('form enviada: ', values)
      onSubmitProps.setSubmitting(false)
   }

   const InitialFormVales = {
      email: '',
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
            ¿Ya tienes una cuenta? &nbsp;<a href="/login">Inicia sesión</a>
         </p>
      </div>
   )
}

export default PwdRecover
