import axios from 'axios';

export const axiosJWT = axios.create();

// Đăng nhập user từ dữ liệu data gửi lên server (email, password)
export const loginUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,
        data
    );
    return res.data;
};

// Đăng ký user mới từ dữ liệu data gửi lên server (email, password)
export const signupUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,
        data
    );
    return res.data;
};

// Lấy thông tin user từ id và access_token (đã giải mã) để gọi api lấy thông tin user từ server (đã đăng nhập)
export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

//tạo mới access token từ refresh token
export const refreshToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/refresh-token`,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/log-out`
    );
    return res.data;
};
