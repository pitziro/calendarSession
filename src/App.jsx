// import BCalendar from '../src/components/Calendar/BigCalendar'
import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SecuredRoutes from './routes/SecuredRoutes'

// import PwdReset from './components/Forms/PwdReset'
// import LoginForm from './components/Forms/LoginUser'
// import PwdRecover from './components/Forms/PwdRecover'
// import SignUpFormik from './components/Forms/SignupUser'
// import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Spinner from './components/Spinner'

const PwdReset = lazy(() => import('./components/Forms/PwdReset'))
const LoginForm = lazy(() => import('./components/Forms/LoginUser'))
const PwdRecover = lazy(() => import('./components/Forms/PwdRecover'))
const SignUpFormik = lazy(() => import('./components/Forms/SignupUser'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const appRouter = createBrowserRouter([
   {
      path: '/',
      element: <SecuredRoutes />,
      children: [{ path: 'dashboard', element: <Dashboard /> }],
   },
   {
      path: '/signup',
      element: <SignUpFormik />,
   },
   {
      path: '/login',
      element: <LoginForm />,
   },
   {
      path: '/pwdrecover',
      element: <PwdRecover />,
   },
   {
      path: 'pwdreset',
      element: <PwdReset />,
   },
   {
      path: '*',
      element: <NotFound />,
   },
])

function App() {
   return (
      <Suspense fallback={<Spinner />}>
         <RouterProvider router={appRouter} />
      </Suspense>
   )
}

export default App
