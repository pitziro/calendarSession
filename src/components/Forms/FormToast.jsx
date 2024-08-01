import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function FormToast() {
   return (
      <ToastContainer
         position="top-right"
         autoClose={3500}
         limit={1}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         transition={Bounce}
         closeButton={false}
      />
   )
}

export default FormToast
