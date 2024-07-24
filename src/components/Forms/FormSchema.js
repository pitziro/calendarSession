import * as Yup from 'yup'

const regexPhone = /^(9)[0-9]{8}$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const SignUpSchema = Yup.object().shape({
   nombres: Yup.string()
      .required('Nombres es requerido')
      .min(4, 'Introduza un nombre válido(4)')
      .max(20, 'Introduzca un nombre válido (20)'),

   apellidos: Yup.string()
      .required('Apellidos es requerido')
      .min(4, 'Introduza un nombre válido (4)')
      .max(20, 'Introduzca un apellido válido (20)'),

   movil: Yup.string()
      .matches(
         regexPhone,
         'El número de teléfono debe empezar por 9 y tener 9 dígitos'
      )
      .required('Movil es requerido'),
   email: Yup.string()
      .required('Email es requerido')
      .matches(regexEmail, 'Introduzca un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(5, 'Introduza una contraseña válida (5)')
      .max(12, 'Introduzca una contraseña válida (12)'),
})

export const SignInSchema = Yup.object().shape({
   email: Yup.string()
      .required('Email es requerido')
      .matches(regexEmail, 'Introduzca un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(5, 'Introduza una contraseña válida (5)')
      .max(12, 'Introduzca una contraseña válida (12)'),
})
