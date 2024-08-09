import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    ispaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems.find(
                (item) => item?.product === orderItem?.product
            );

            //kiểm tra sản phẩm đã có trong giỏ hàng hay chưa nếu có thì tăng số lượng lên
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        addShippingAddress: (state, action) => {
            const { shippingAddress } = action.payload;
            state.shippingAddress = shippingAddress;
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems.find(
                (item) => item?.product === idProduct
            );
            if (itemOrder.amount < 10) {
                itemOrder.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems.find(
                (item) => item?.product === idProduct
            );
            if (itemOrder.amount > 1) {
                itemOrder.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { product } = action.payload;
            state.orderItems = state.orderItems.filter(
                //trả về những sản phẩm không bằng product
                (item) => item?.product !== product
            );
        },
        removeAllOrderProduct: (state, action) => {
            const { products } = action.payload;
            state.orderItems = state.orderItems.filter(
                //trả về những sản phẩm không nằm trong mảng products
                (item) => !products.includes(item?.product)
            );
            state.shippingAddress = {};
        },
        removeOrderAfterPayment: (state) => {
            state.orderItems = [];
            state.shippingAddress = {};
        },
    },
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    addShippingAddress,
    removeOrderAfterPayment,
} = orderSlice.actions;

export default orderSlice.reducer;
