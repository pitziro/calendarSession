import * as Yup from 'yup'

const regexPhone = /^\+?(?!.*\s{4})[0-9\s]{7,15}$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexNames = /^(?!.*\s{3})[A-Za-zÀ-ÿ\s]{1,}$/

export const SignUpSchema = Yup.object().shape({
   nombres: Yup.string()
      .matches(regexNames, 'El formato del nombre no es valido')
      .required('Nombres es requerido')
      .min(4, 'Introduza un nombre válido(min:4)')
      .max(20, 'Introduzca un nombre válido (max:20)'),
   apellidos: Yup.string()
      .matches(regexNames, 'El formato del nombre no es valido')
      .required('Apellidos es requerido')
      .min(4, 'Introduza un nombre válido (min:4)')
      .max(20, 'Introduzca un apellido válido (max:20)'),
   movil: Yup.string()
      .matches(regexPhone, 'Ingrese un número móvil válido')
      .required('Movil es requerido'),
   email: Yup.string()
      .required('Email es requerido')
      .matches(regexEmail, 'Introduzca un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(6, 'Introduza una contraseña válida (min:5)')
      .max(12, 'Introduzca una contraseña válida (max:12)'),
})

export const SignInSchema = Yup.object().shape({
   email: Yup.string()
      .required('Email es requerido')
      .matches(regexEmail, 'Introduzca un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(6, 'Introduza una contraseña válida (5)')
      .max(12, 'Introduzca una contraseña válida (12)'),
})
