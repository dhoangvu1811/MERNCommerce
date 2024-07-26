import React, { useState } from 'react';
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
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data, isPending } = mutation;
    // console.log('mutation', mutation);

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
        mutation.mutate({
            email,
            password,
        });
    };
    return (
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
                    {data?.status === 'ERR' && (
                        <WrapperMessageERR>{data?.message}</WrapperMessageERR>
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
    );
};

export default SignInPage;
