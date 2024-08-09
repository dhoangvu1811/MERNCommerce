import React, { useEffect, useState } from 'react';
import {
    WrapperAnchor,
    WrapperButton,
    WrapperButtonComponent,
    WrapperContainer,
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperForm,
    WrapperInfield,
    WrapperMessageERR,
    WrapperOverlay,
    WrapperOverlayBtn,
    WrapperOverlayContainer,
    WrapperOverlayLeft,
    WrapperOverlayPanel,
    WrapperOverlayRight,
    WrapperSignIn,
    WrappersignInContainer,
    WrappersignUpContainer,
    WrapperSocialContainer,
    WrapperText,
    WrapperTitle,
} from './SignInStyle';
import InputForm from '../../components/InputForm/InputForm';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import {
    FacebookOutlined,
    GooglePlusOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';

const SignInPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');

    // Hook dispatch để gửi action lên store
    const dispatch = useDispatch();

    // Hook gọi api đăng nhập user từ dữ liệu data gửi lên server (email, password) từ UserService
    const mutationSignIn = useMutationHook((data) =>
        UserService.loginUser(data)
    );
    const {
        data: dataSignIn,
        isPending: isPendingSignIn,
        isSuccess: isSuccessSignIn,
        isError: isErrorSignIn,
        failureCount: failureCountSignIn,
        failureReason: failureReasonSignIn,
    } = mutationSignIn;
    useEffect(() => {
        if (isSuccessSignIn) {
            success(dataSignIn?.message);
            if (location?.state) {
                setTimeout(() => {
                    navigate(location?.state);
                }, 1000);
            } else {
                setTimeout(() => {
                    navigate('/');
                }, 1000); // Độ trễ 1 giây trước khi chuyển trang
            }
            // Lưu access_token vào localStorage
            localStorage.setItem(
                'access_token',
                JSON.stringify(dataSignIn?.access_token)
            );
            if (dataSignIn?.access_token) {
                // giải mã token
                const decoded = jwtDecode(dataSignIn?.access_token);
                // Lấy thông tin user từ token giải mã được và access_token để gọi api
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, dataSignIn?.access_token);
                }
            }
        } else if (failureCountSignIn > 0) {
            error(failureReasonSignIn?.response?.data?.message);
        }
    }, [isSuccessSignIn, isErrorSignIn]);

    // Hàm lấy thông tin user
    const handleGetDetailsUser = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token: access_token }));
    };

    const handleOnChangeEmailSignIn = (e) => {
        setEmailSignIn(e.target.value);
    };
    const handleOnChangePasswordSignIn = (e) => {
        setPasswordSignIn(e.target.value);
    };
    const handleSignIn = (e) => {
        // Gọi hàm mutate để gọi api đăng nhập user từ dữ liệu data gửi lên server (email, password)
        mutationSignIn.mutate({
            emailSignIn,
            passwordSignIn,
        });
    };

    //đăng ký
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState('');

    const success = (mes = 'Thành công') => {
        messageApi.open({
            type: 'success',
            content: mes,
        });
    };

    const error = (mes = 'Thất bại') => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };

    const mutationSignUp = useMutationHook((data) =>
        UserService.signupUser(data)
    );
    const {
        data: dataSignUp,
        isPending: isPendingSignUp,
        isSuccess: isSuccessSignUp,
        isError: isErrorSignUp,
        failureReason: failureReasonSignUp,
        failureCount: failureCountSignUp,
    } = mutationSignUp;

    useEffect(() => {
        if (isSuccessSignUp) {
            success(dataSignUp?.message);
            setEmailSignUp('');
            setPasswordSignUp('');
            setConfirmPasswordSignUp('');
        } else if (failureCountSignUp > 0) {
            error(failureReasonSignUp?.response?.data?.message);
        }
    }, [isSuccessSignUp, isErrorSignUp]);

    const handleOnChangeEmailSignUp = (e) => {
        setEmailSignUp(e.target.value);
    };
    const handleOnChangePasswordSignUp = (e) => {
        setPasswordSignUp(e.target.value);
    };
    const handleOnChangeConfirmPasswordSignUp = (e) => {
        setConfirmPasswordSignUp(e.target.value);
    };
    const handleSignUp = () => {
        mutationSignUp.mutate({
            emailSignUp,
            passwordSignUp,
            confirmPasswordSignUp,
        });
    };

    // Hàm chuyển đổi giữa form đăng nhập và form đăng ký
    useEffect(() => {
        const container = document.getElementById('container');
        const overlaycon = document.getElementById('overlayCon');
        const overlayBtn = document.getElementById('overlayBtn');

        const handleOverlayBtnClick = () => {
            container.classList.toggle('right-panel-active');
            overlayBtn.classList.remove('btnScaled');
            window.requestAnimationFrame(() => {
                overlayBtn.classList.add('btnScaled');
            });
        };

        overlayBtn.addEventListener('click', handleOverlayBtnClick);

        return () => {
            overlayBtn.removeEventListener('click', handleOverlayBtnClick);
        };
    }, []);
    return (
        <>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <WrapperContainer className='container' id='container'>
                    <WrappersignUpContainer className='form-container sign-up-container'>
                        <WrapperForm>
                            <h1>Create Account</h1>
                            <WrapperSocialContainer className='social-container'>
                                <WrapperAnchor href='#' className='social'>
                                    <FacebookOutlined />
                                </WrapperAnchor>
                                <WrapperAnchor href='#' className='social'>
                                    <GooglePlusOutlined />
                                </WrapperAnchor>
                                <WrapperAnchor href='#' className='social'>
                                    <LinkedinOutlined />
                                </WrapperAnchor>
                            </WrapperSocialContainer>
                            <span>or use your email for registration</span>
                            <WrapperInfield className='infield'>
                                <InputForm
                                    value={emailSignUp}
                                    onChange={handleOnChangeEmailSignUp}
                                    placeholder='abc@email.com'
                                    style={{ height: '40px' }}
                                />
                            </WrapperInfield>
                            <WrapperInfield className='infield'>
                                <InputForm
                                    value={passwordSignUp}
                                    onChange={handleOnChangePasswordSignUp}
                                    placeholder='Mật khẩu'
                                    type='password'
                                    style={{
                                        marginTop: '10px',
                                        height: '40px',
                                    }}
                                />
                            </WrapperInfield>
                            <WrapperInfield className='infield'>
                                <InputForm
                                    value={confirmPasswordSignUp}
                                    onChange={
                                        handleOnChangeConfirmPasswordSignUp
                                    }
                                    placeholder='Nhập lại mật khẩu'
                                    type='confirmPassword'
                                    style={{
                                        marginTop: '10px',
                                        height: '40px',
                                    }}
                                />
                            </WrapperInfield>
                            <LoadingComponent isPending={isPendingSignUp}>
                                <WrapperButtonComponent
                                    disabled={
                                        !emailSignUp.length ||
                                        !passwordSignUp.length ||
                                        !confirmPasswordSignUp.length
                                    }
                                    onClick={handleSignUp}
                                    textButton={'Tạo tài khoản'}
                                />
                            </LoadingComponent>
                        </WrapperForm>
                    </WrappersignUpContainer>
                    <WrappersignInContainer className='form-container sign-in-container'>
                        <WrapperForm>
                            <WrapperTitle>Sign in</WrapperTitle>
                            <WrapperSocialContainer className='social-container'>
                                <WrapperAnchor href='#' className='social'>
                                    <FacebookOutlined />
                                </WrapperAnchor>
                                <WrapperAnchor href='#' className='social'>
                                    <GooglePlusOutlined />
                                </WrapperAnchor>
                                <WrapperAnchor href='#' className='social'>
                                    <LinkedinOutlined />
                                </WrapperAnchor>
                            </WrapperSocialContainer>
                            <span style={{ fontSize: '1.2rem' }}>
                                or use your account
                            </span>
                            <WrapperInfield className='infield'>
                                <InputForm
                                    value={emailSignIn}
                                    onChange={handleOnChangeEmailSignIn}
                                    placeholder='abc@email.com'
                                    style={{ height: '40px' }}
                                />
                            </WrapperInfield>
                            <WrapperInfield className='infield'>
                                <InputForm
                                    value={passwordSignIn}
                                    onChange={handleOnChangePasswordSignIn}
                                    placeholder='Mật khẩu'
                                    type='password'
                                    style={{
                                        marginTop: '10px',
                                        height: '40px',
                                    }}
                                />
                            </WrapperInfield>
                            <WrapperAnchor href='#' className='forgot'>
                                Forgot your password?
                            </WrapperAnchor>
                            <LoadingComponent isPending={isPendingSignIn}>
                                <WrapperButtonComponent
                                    onClick={handleSignIn}
                                    disabled={!emailSignIn || !passwordSignIn}
                                    textButton={'Đăng nhập'}
                                />
                            </LoadingComponent>
                        </WrapperForm>
                    </WrappersignInContainer>
                    <WrapperOverlayContainer
                        className='overlay-container'
                        id='overlayCon'
                    >
                        <WrapperOverlay className='overlay'>
                            <WrapperOverlayLeft className='overlay-panel overlay-left'>
                                <h1>Welcome Back!</h1>
                                <WrapperText>
                                    To keep connected with us please login with
                                    your personal info
                                </WrapperText>
                                <WrapperButton>Sign In</WrapperButton>
                            </WrapperOverlayLeft>
                            <WrapperOverlayRight className='overlay-panel overlay-right'>
                                <h1>Hello, Friend!</h1>
                                <WrapperText>
                                    Enter your personal details and start
                                    journey with us
                                </WrapperText>
                                <WrapperButton>Sign Up</WrapperButton>
                            </WrapperOverlayRight>
                        </WrapperOverlay>
                        <WrapperOverlayBtn id='overlayBtn'></WrapperOverlayBtn>
                    </WrapperOverlayContainer>
                </WrapperContainer>
            </div>
        </>
    );
};

export default SignInPage;
