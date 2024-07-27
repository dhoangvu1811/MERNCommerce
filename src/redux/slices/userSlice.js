import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    name: '',
    email: '',
    access_token: '',
};

// Slice là nơi chứa các reducers và action creators
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token } = action.payload;
            // console.log('action.payload', action.payload);

            // Cập nhật thông tin user vào state global
            state.name = name || email;
            state.email = email;
            state.access_token = access_token;
        },
        logoutUser: (state) => {
            // Xóa thông tin user khỏi state global
            state.name = '';
            state.email = '';
            state.access_token = '';
        },
    },
});

// Export action để dispatch
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
