import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore=create((set, get)=> ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async({name, email, password, confirmPassword})=>{
     set({loading: true})

     if(password!==confirmPassword){
        set({loading: false})
        return toast.error('Passwords do not match')
     }
     try {
        const res= await axios.post("/auth/signup", {name, email, password})
        set({user:res.user, loading:false})
     } catch (error) {
        toast.error(error.response.data.message || 'An error occurred') 
     }
    },

    login: async({email, password})=>{
        set({loading: true})
        try {
            const res= await axios.post("/auth/login", {email, password})
            console.log(res)
            console.log(res.data)
            set({user:res, loading: false})
            toast.success('Logged in successfully');
        } catch (error) {
            toast.error(error.response.data.message || 'An error occurred')
            set({ loading: false });
        }
        
    },

    logout: async ()=>{
        try {
            await axios.post('/auth/logout');
            set({user: null});
            console.log("User after logout: ", get().user); // Check if user is null
            toast.success('Logged out successfully');
        } catch (error) {
            console.log(error.message);
            toast.error('Found some errors while logging out',error.response.data.message);
        }
        
    },

    checkAuth: async ()=>{
        set({checkingAuth: true});
        try {
            const response = await axios.get('/auth/profile');
            console.log(response)
            set({user: response.data, checkingAuth: false});
        } catch (error) {
            console.log(error.message);
            // console('There must be some error in profile server route')
            set({ checkingAuth: false, user:null});
        }
    }
}))

// TODO implement the axios intercepter for refreshing the access token