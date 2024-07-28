import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
};

// Slice là nơi chứa các reducers và action creators
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                phone = '',
                address = '',
                avatar = '',
                _id = '',
                access_token = '',
            } = action.payload;
            // console.log('action.payload', action.payload);

            // Cập nhật thông tin user vào state global
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
        },
        logoutUser: (state) => {
            // Xóa thông tin user khỏi state global
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
        },
    },
});

// Export action để dispatch
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
