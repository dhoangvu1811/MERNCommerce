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
