import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        SET_USER: (state, action) => {
            return { ...state, users: action.payload }
        }
    }
});
