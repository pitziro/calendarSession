import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userInfoStore = set => ({
   // state variables
   userInfo: {
      userEmail: '',
      userId: '',
      userToken: '',
      userFullname: '', //será Nombre + Apellido
      userPhoneNumber: '',
      rol: '',
      aseguradora: '',
   },

   isAuth: false,

   userAgenda: [{}],

   // state setters
   setIsAuth: authValue => set({ isAuth: authValue }),

   setUserInfo: (userEmail, userId, userToken) =>
      set(state => ({
         userInfo: {
            ...state.userInfo,
            userEmail,
            userId,
            userToken,
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
         userInfo: {
            userEmail: '',
            userId: '',
            userToken: '',
            userFullname: '', //será Nombre + Apellido
            userPhoneNumber: '',
            rol: '',
            aseguradora: '',
         },
      }),
})

export const useUserInfoStore = create(
   persist(userInfoStore, { name: 'userInfoAuth' })
)
