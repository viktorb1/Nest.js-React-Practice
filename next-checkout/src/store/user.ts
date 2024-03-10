import { create } from 'zustand'

export const userStore = create((set) => ({
    user: {
        full_name: "Guillaume"
    },
    updateUser: (newUser: any) => set((state: any) => ({
        user: {...state.user, ...newUser}
    })),
    fetchUser: async () => {
        const response = await fetch('/api/user')
        const user = await response.json()
        set({user: user})
    }
}))