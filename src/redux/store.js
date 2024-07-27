import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// store được tạo ra từ configureStore với reducer là userReducer
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
