import { Link } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { emailPwdResetSchema } from './FormSchema'
import { resetUserPwd } from '../../supabase/handleClient'
import { toast } from 'react-toastify'
import InputField from './CustomInputField'
import FormToast from './FormToast'

function PwdRecover() {
   const callToasterError = pErrorMsg => {
      toast.error(pErrorMsg, {
         className: 'myToastContainerErr',
         bodyClassName: 'myToastBodyErr',
      })
   }

   const callToasterOk = pOkMsg => {
      toast.success(pOkMsg, {
         className: 'myToastContainerErr',
         bodyClassName: 'myToastBodyErr',
      })
   }

   const handleFormSubmit = async (values, onSubmitProps) => {
      try {
         await resetUserPwd(values.email)
         callToasterOk(
            'Si tu correo esta registrado, recibirás un link en unos momentos'
         )
      } catch (error) {
         let errorMessage = 'Error! Por favor, intenta de nuevo más tarde.'
         switch (error.message) {
            case 'Email not found':
               errorMessage =
                  'No se encontró una cuenta con ese correo electrónico'
               break
            case 'For security purposes, you can only request this once every 60 seconds':
               errorMessage =
                  'Por seguridad, solo puedes solicitar esto una vez cada 60 segundos'
               break
            case 'Invalid email':
               errorMessage = 'El correo electrónico proporcionado no es válido'
               break
            case 'Rate limit exceeded':
               errorMessage =
                  'Demasiados intentos. Por favor, intenta de nuevo más tarde'
               break
            default:
               if (error.status === 500) {
                  errorMessage =
                     'Error del servidor. Por favor, intenta de nuevo más tarde'
               }
         }
         callToasterError(errorMessage)
      } finally {
         onSubmitProps.setSubmitting(false)
      }
   }

   const InitialFormVales = {
      email: '',
   }

   return (
      <div className="formContainer">
         <FormToast />
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
