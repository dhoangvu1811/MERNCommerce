import React, { useEffect, useState } from 'react';
import {
    WrapperHeader,
    WrapperContentProfile,
    WrapperLabel,
    WrapperInput,
} from './ProfileStyle';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService.js';
import { useMutationHook } from '../../hooks/useMutationHook.js';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    // Hàm thông báo
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật thất bại',
        });
    };

    // Hook useMutationHook để cập nhật thông tin user
    const mutation = useMutationHook((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, access_token, rests);
    });
    const { data, isPending, isSuccess, isError } = mutation;
    console.log('mutation', mutation);

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setAddress(user?.address);
        setPhone(user?.phone);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            success();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        if (isError) {
            error();
        }
    }, [isSuccess, isError]);
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleOnChangeAvatar = (e) => {
        setAvatar(e.target.value);
    };
    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            access_token: user?.access_token,
            email,
            name,
            address,
            phone,
            avatar,
        });
    };
    return (
        <>
            {contextHolder}
            <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
                <WrapperHeader>Thông tin người dùng</WrapperHeader>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>
                            Hình đại diện
                        </WrapperLabel>
                        <InputForm
                            value={avatar}
                            onChange={handleOnChangeAvatar}
                            id='avatar'
                            style={{ width: '300px' }}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                border: '1px solid rgb(26, 148, 255)',
                                background: 'none',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{
                                color: 'rgb(26, 148, 255)',
                                fontsize: '1.5rem',
                                fontWeight: '600',
                            }}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Họ và tên</WrapperLabel>
                        <InputForm
                            value={name}
                            onChange={handleOnChangeName}
                            id='name'
                            style={{ width: '300px' }}
                            placeholder={'Nguyễn Văn A'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm
                            value={email}
                            onChange={handleOnChangeEmail}
                            id='email'
                            style={{ width: '300px' }}
                            placeholder={'abc@gmail.com'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Địa chỉ</WrapperLabel>
                        <InputForm
                            value={address}
                            onChange={handleOnChangeAddress}
                            id='address'
                            style={{ width: '300px' }}
                            placeholder={'Quảng Nam'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>
                            Số điện thoại
                        </WrapperLabel>
                        <InputForm
                            value={phone}
                            onChange={handleOnChangePhone}
                            id='phone'
                            style={{ width: '300px' }}
                            placeholder={'0123423687'}
                        />
                    </WrapperInput>
                </WrapperContentProfile>
            </div>
        </>
    );
};

export default ProfilePage;
