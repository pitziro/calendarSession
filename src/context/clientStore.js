import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userInitialState = {
   userEmail: '',
   userId: '',
   userFullname: '', // será Nombre + Apellido
   userPhoneNumber: '',
   rol: '', // invitado = socio | signUp = cliente
   aseguradora: '',
}

const userInfoStore = set => ({
   // state variables
   userInfo: userInitialState,
   isAuth: false,
   sessionToken: '',
   userAgenda: [{}],

   // state setters
   setIsAuth: authValue => set({ isAuth: authValue }),

   setSessionToken: tokenValue => set({ sessionToken: tokenValue }),

   setUserInfo: (userEmail, userId) =>
      set(state => ({
         userInfo: {
            ...state.userInfo,
            userEmail,
            userId,
         },
      })),

   updateUserExtraInfo: (userFullname, userPhoneNumber, rol, aseguradora) =>
      set(state => ({
         userInfo: {
            ...state.userInfo,
            userFullname,
            userPhoneNumber,
            rol,
            aseguradora,
         },
      })),

   emptyUserInfo: () =>
      set({
         userInfo: userInitialState,
      }),
})

export const useUserInfoStore = create(
   persist(userInfoStore, { name: 'userInfoAuth' })
)
