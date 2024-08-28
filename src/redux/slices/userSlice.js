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
    refresh_token: '',
    city: '',
    isAdmin: false,
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
                image = '',
                _id = '',
                access_token = '',
                refresh_token = '',
                city = '',
                isAdmin,
            } = action.payload;
            // console.log('action.payload', action.payload);

            // Cập nhật thông tin user vào state global
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = image;
            state.id = _id;
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.isAdmin = isAdmin;
            state.city = city;
        },
        logoutUser: (state) => {
            // Xóa thông tin user khỏi state global
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.id = '';
            state.city = '';
            state.access_token = '';
            state.refresh_token = '';
            state.isAdmin = false;
        },
    },
});

// Export action để dispatch
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
