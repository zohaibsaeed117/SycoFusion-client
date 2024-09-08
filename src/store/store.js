import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isLogin: false,
  user: {
    firstName: "A",
    lastName: "B",
    email: "a@b.com",
  },
  theme: "light",
  isAlert: false,
  alertMsg: "",
  alertType: "",
  isLogin: false,
  setIsLogin: newState => set({ isLogin: newState }),
  setUser: (newState) => set({ user: newState }),
  setIsAlert: (newState) => set({ isAlert: newState }),
  setAlertMsg: (newState) => set({ alertMsg: newState }),
  setAlertType: (newState) => set({ alertType: newState }),
  setTheme: (newTheme) => set({ theme: newTheme }),

}))