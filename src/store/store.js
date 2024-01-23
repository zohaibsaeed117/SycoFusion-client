import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isLogin: false,
  Username: "check",
  email: "",
  avatar: "",
  firstName: "",
  lastName: "",
  theme: "light",
  isAlert: false,
  alertMsg: "",
  alertType: "",
  attachments: [],
  uploadProgressCaption: "",
  attachmentProgress: 0,
  setAttachmentProgress: (newState) => set({ attachmentProgress:newState}),
  setUploadProgressCaption: (newState) => set({ uploadProgressCaption:newState}),
  setAttachments: (attachment) => {
    set((state) => ({
      attachments: [...state.attachments, attachment],
    }));
  },
  resetAttachments: () => set({ attachments: [] }),

  setFirstName: (newState) => set({ firstName:newState}),
  setLastName: (newState) => set({ lastName:newState}),
  setIsLogin: (newState) => set({ isLogin:newState}),
  setUsername: (newState) => set({ Username:newState}),
  setEmail: (newState) => set({ email:newState}),
  setAvatar: (newState) => set({ avatar:newState}),
  setIsAlert: (newState) => set({ isAlert:newState}),
  setAlertMsg: (newState) => set({ alertMsg:newState }),
  setAlertType: (newState) => set({ alertType:newState }),
  setTheme: (newTheme) => set({ theme:newTheme }),

}))