import React, { useEffect, useState } from 'react';
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperMessageERR,
    WrapperSignIn,
} from './SignInStyle';
import InputForm from '../../components/InputForm/InputForm';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import signin from '../../assets/images/signup.png';
import { Image, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    // Hook dispatch để gửi action lên store
    const dispatch = useDispatch();

    // Hàm thông báo
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công',
        });
    };
    const error = (mes = 'Đăng nhập thất bại') => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };

    // Hook gọi api đăng nhập user từ dữ liệu data gửi lên server (email, password) từ UserService
    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data, isPending, isSuccess, isError, failureCount, failureReason } =
        mutation;
    // console.log('mutation', mutation);

    useEffect(() => {
        if (isSuccess) {
            success();
            setTimeout(() => {
                navigate('/');
            }, 1000); // Độ trễ 1 giây trước khi chuyển trang

            // Lưu access_token vào localStorage
            localStorage.setItem(
                'access_token',
                JSON.stringify(data?.access_token)
            );
            if (data?.access_token) {
                // giải mã token
                const decoded = jwtDecode(data?.access_token);
                console.log('decoded', decoded);

                // Lấy thông tin user từ token giải mã được và access_token để gọi api
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        } else if (failureCount > 0) {
            error(failureReason?.response?.data?.message);
        }
    }, [isSuccess, isError]);

    // Hàm lấy thông tin user
    const handleGetDetailsUser = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token: access_token }));
        console.log('res', res);
    };

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    };
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSignIn = (e) => {
        // Gọi hàm mutate để gọi api đăng nhập user từ dữ liệu data gửi lên server (email, password)
        mutation.mutate({
            email,
            password,
        });
    };
    return (
        <>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.53)',
                }}
            >
                <WrapperSignIn>
                    <WrapperContainerLeft>
                        <div className='heading'>
                            <h4>Xin chào,</h4>
                            <p>Đăng nhập hoặc Tạo tài khoản</p>
                        </div>
                        <InputForm
                            value={email}
                            onChange={handleOnChangeEmail}
                            placeholder='abc@email.com'
                            style={{ height: '40px' }}
                        />
                        <InputForm
                            value={password}
                            onChange={handleOnChangePassword}
                            placeholder='Mật khẩu'
                            type='password'
                            style={{ marginTop: '10px', height: '40px' }}
                        />
                        {data?.status === 'error' && (
                            <WrapperMessageERR>
                                {data?.message}
                            </WrapperMessageERR>
                        )}
                        <LoadingComponent isPending={isPending}>
                            <ButtonComponent
                                onClick={handleSignIn}
                                disabled={!email || !password}
                                textButton={'Đăng nhập'}
                                styleButton={{
                                    background: '#ff424e',
                                    height: '48px',
                                    width: '100%',
                                    border: 'none',
                                    color: '#fff',
                                    margin: '26px 0 10px',
                                }}
                            />
                        </LoadingComponent>
                        <p className='forgot-pass'>Quên mật khẩu?</p>
                        <p className='create-account'>
                            Chưa có tài khoản?{' '}
                            <span onClick={handleNavigateSignUp}>
                                Tạo tài khoản
                            </span>
                        </p>
                    </WrapperContainerLeft>
                    <WrapperContainerRight>
                        <Image
                            src={signin}
                            preview={false}
                            alt='signinlogo'
                            width='203px'
                            height='203px'
                        />
                        <div className='content'>
                            <h4>Mua sắm tại Tiki</h4>
                            <span>Siêu ưu đãi mỗi ngày</span>
                        </div>
                    </WrapperContainerRight>
                </WrapperSignIn>
            </div>
        </>
    );
};

export default SignInPage;
