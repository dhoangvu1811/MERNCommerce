import { axiosJWT } from './UserService';

export const createOrder = async (id, access_token, data) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/order/create/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const getAllOrder = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/getAllOrder/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const getDetailsOrder = async (idOrder, access_token, idUser) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/getDetailsOrder/${idUser}?idOrder=${idOrder}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const cancelOrder = async (
    idOrder,
    access_token,
    idUser,
    orderItems
) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/order/cancelOrder/${idUser}?idOrder=${idOrder}`,
        { data: orderItems },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllOrderAdmin = async (access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/getAllOrderAdmin`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
