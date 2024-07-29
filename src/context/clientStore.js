import { create } from 'zustand'

const ClientStore = set => ({
   // state variables
   client: {
      userEmail: '',
      userId: '',
      userToken: '',
   },

   // state setters
   setClient: (userEmail, userId, userToken) =>
      set(state => ({
         client: {
            ...state.client,
            userEmail,
            userId,
            userToken,
         },
      })),

   emptyClient: () =>
      set({ client: { userEmail: '', userId: '', userToken: '' } }),
})

export const useClientStore = create(ClientStore)
