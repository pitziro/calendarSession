import { ErrorMessage } from 'formik'
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

export default InputField
