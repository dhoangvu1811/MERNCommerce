import React from 'react';
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperSignIn,
} from './SignUpStyle';
import { Image } from 'antd';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import signin from '../../assets/images/signup.png';

const SignUpPage = () => {
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
                        placeholder='abc@email.com'
                        style={{ height: '40px' }}
                    />
                    <InputForm
                        placeholder='Mật khẩu'
                        type='password'
                        style={{ marginTop: '10px', height: '40px' }}
                    />
                    <InputForm
                        placeholder='Nhập lại mật khẩu'
                        type='passwordConfirm'
                        style={{ marginTop: '10px', height: '40px' }}
                    />
                    <ButtonComponent
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
                    {/* <p className='forgot-pass'>Quên mật khẩu?</p> */}
                    <p className='create-account'>
                        Bạn đã có tài khoản? <span>Đăng nhập</span>
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

export default SignUpPage;
