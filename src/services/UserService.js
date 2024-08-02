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

// Cập nhật thông tin user từ id và dữ liệu data gửi lên server (name, email, phone, address, avatar)
export const updateUser = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/user/update_user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/user/getAll`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/user/delete_user/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/user/deleteMany`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
