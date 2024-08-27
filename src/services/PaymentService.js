import axios from 'axios';

export const getConfigPayment = async (access_token) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/payment/config`
    );
    return res.data;
};
