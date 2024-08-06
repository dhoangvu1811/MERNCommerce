import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/ProductSlice';
import orderReducer from './slices/OrderSlice';

// store được tạo ra từ configureStore với reducer là userReducer
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        order: orderReducer,
    },
});
