// import BCalendar from '../src/components/Calendar/BigCalendar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginForm from './components/Forms/LoginUser'
import PwdRecover from './components/Forms/PwdRecover'
import SignUpFormik from './components/Forms/SignUpUser'
import PwdReset from './components/Forms/PwdReset'

function App() {
   return (
      <Routes>
         <Route path="/signup" element={<SignUpFormik />} />
         <Route path="/login" element={<LoginForm />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/pwdrecover" element={<PwdRecover />} />
         <Route path="/pwdreset" element={<PwdReset />} />
      </Routes>
   )
}

export default App
