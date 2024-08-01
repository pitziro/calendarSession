export const userInfoStore = set => ({
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

   // state setters
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
         },
      }),
})
