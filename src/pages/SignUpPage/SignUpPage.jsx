import React, { useEffect, useState } from 'react';
import { Image, message } from 'antd';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import signin from '../../assets/images/signup.png';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperMessageERR,
    WrapperSignIn,
} from './SignUpStyle';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng ký tài khoản thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Đăng ký tài khoản thất bại',
        });
    };

    const mutation = useMutationHook((data) => UserService.signupUser(data));
    console.log(mutation);
    const { data, isPending, isSuccess, isError, failureReason } = mutation;

    useEffect(() => {
        if (isSuccess) {
            success();
            setTimeout(() => {
                handleNavigateSignIn();
            }, 1000); // Độ trễ 1 giây trước khi chuyển trang
        } else if (isError) {
            error();
        }
    }, [isSuccess, isError]);

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleOnChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
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
                        <InputForm
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                            placeholder='Nhập lại mật khẩu'
                            type='confirmPassword'
                            style={{ marginTop: '10px', height: '40px' }}
                        />
                        {data?.status === 'error' && (
                            <WrapperMessageERR>
                                {data?.message}
                            </WrapperMessageERR>
                        )}
                        <LoadingComponent isPending={isPending}>
                            <ButtonComponent
                                disabled={
                                    !email.length ||
                                    !password.length ||
                                    !confirmPassword.length
                                }
                                onClick={handleSignUp}
                                textButton={'Tạo tài khoản'}
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
                        {/* <p className='forgot-pass'>Quên mật khẩu?</p> */}
                        <p className='create-account'>
                            Bạn đã có tài khoản?{' '}
                            <span onClick={handleNavigateSignIn}>
                                Đăng nhập
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

export default SignUpPage;
