import React, { useEffect, useRef, useState } from 'react';
import {
    WrapperForm,
    WrapperHeader,
    WrapperUploadFile,
} from './AdminUserStyle';
import { Button, Form, Input, message, Space } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleFilled,
    SearchOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import InputForm from '../InputForm/InputForm';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';
import { useMutationHook } from '../../hooks/useMutationHook';
import { getBase64 } from '../../until';

const AdminUser = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state.user);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [formAdd] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [stateUser, setStateUser] = useState({
        emailSignUp: '',
        passwordSignUp: '',
        confirmPasswordSignUp: '',
    });
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        image: '',
    });

    // Hàm lấy tất cả dữ liệu người dùng từ api
    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token);
        return res;
    };
    // Hàm lấy chi tiết người dùng từ api
    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(
            rowSelected,
            user?.access_token
        );
        // console.log('res', res);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                address: res?.data?.address,
                image: res?.data?.image,
                city: res?.data?.city,
            });
        }
        setIsPendingUpdate(false);
        return res;
    };
    const handleDelete = (e) => {
        setIsModalOpenDelete(true);
    };
    const handleDetailsUser = (e) => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            setIsOpenDrawer(true);
            fetchGetDetailsUser(rowSelected);
        }
    };
    const renderAction = () => {
        return (
            <div style={{ display: 'flex', gap: '20px' }}>
                <DeleteOutlined onClick={handleDelete} />
                <EditOutlined onClick={handleDetailsUser} />
            </div>
        );
    };

    // Lấy dữ liệu Người dùng từ api để hiển thị lên bảng
    const queryUser = useQuery({
        queryKey: ['getAllUser'],
        queryFn: getAllUser,
        retry: 1,
        retryDelay: 1000,
    });
    const { isLoading: isLoadingUser, data: Users } = queryUser;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columnTable = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            sorter: (a, b) => a.isAdmin.length - b.isAdmin.length,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        Users?.data?.length &&
        Users?.data?.map((user) => {
            return {
                key: user._id,
                name: user.name || '(trống)',
                email: user.email,
                phone: user.phone || '(trống)',
                address: user.address || '(trống)',
                city: user.city || '(trống)',
                isAdmin: user.isAdmin ? 'Admin' : 'User',
            };
        });

    // Hàm thêm người dùng
    const mutation = useMutationHook((data) => {
        const res = UserService.signupUser(data);
        return res;
    });
    const { data, isPending, isSuccess, isError, failureReason, failureCount } =
        mutation;

    // Hàm cập nhật thông tin nguời dùng
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data;
        const res = UserService.updateUser(id, token, rest);
        return res;
    });
    const {
        data: dataUpdate,
        isPending: isPendingUpdateMutation,
        isSuccess: isSuccessUpdate,
        isError: isErrorUpdate,
        failureReason: failureReasonUpdate,
        failureCount: failureCountUpdate,
    } = mutationUpdate;

    // Hàm cập xóa người dùng
    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });
    const {
        data: dataDelete,
        isPending: isPendingDeleteMutation,
        isSuccess: isSuccessDelete,
        isError: isErrorDelete,
        failureReason: failureReasonDelete,
        failureCount: failureCountDelete,
    } = mutationDelete;

    // Hàm cập xóa người dùng tuỳ chọn
    const mutationDeleteManyUser = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });
    const {
        data: dataDeleteManyUser,
        isPending: isPendingDeleteMutationManyUser,
        isSuccess: isSuccessDeleteManyUser,
        isError: isErrorDeleteManyUser,
        failureReason: failureReasonDeleteManyUser,
        failureCount: failureCountDeleteManyUser,
    } = mutationDeleteManyUser;

    const handleDeleteManyUser = (ids) => {
        mutationDeleteManyUser.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };
    // Hàm thông báo
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

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const handleDeleteUser = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        formAdd.resetFields();
    };
    const handleCancelUpdate = () => {
        setIsOpenDrawer(false);
        formUpdate.resetFields();
    };
    const onFinish = (values) => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch();
            },
        });
    };
    const onUpdateUser = (values) => {
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateUserDetails,
            },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };

    const handleOnChange = async (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeDetails = async (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            image: file.preview,
        });
    };
    // Hàm xử lý khi thêm người dùng thành công hoặc thất bại
    useEffect(() => {
        if (isSuccess && data?.status === 'success') {
            success('Thêm người dùng thành công');
            handleCancel();
        } else if (failureCount > 0) {
            error(failureReason?.response?.data.message);
        }
    }, [isSuccess, isError]);

    // Hàm xử lý khi cập nhật người dùng thành công hoặc thất bại
    useEffect(() => {
        if (isSuccessUpdate && dataUpdate?.status === 'success') {
            success('Cập nhật người dùng thành công');
            handleCancelUpdate();
        } else if (failureCountUpdate > 0) {
            error(failureReasonUpdate?.response?.data.message);
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    // Hàm xử lý khi xoá người dùng thành công hoặc thất bại
    useEffect(() => {
        if (isSuccessDelete && dataDelete?.status === 'success') {
            success('Xoá người dùng thành công');
            handleCancelDelete();
        } else if (failureCountDelete > 0) {
            error(failureReasonDelete?.response?.data.message);
        }
    }, [isSuccessDelete, isErrorDelete]);

    // Hàm xử lý khi xoá người dùng tuỳ chọn thành công hoặc thất bại
    useEffect(() => {
        if (
            isSuccessDeleteManyUser &&
            dataDeleteManyUser?.status === 'success'
        ) {
            success('Xoá người dùng tuỳ chọn thành công');
        } else if (failureCountDeleteManyUser > 0) {
            error(failureReasonDeleteManyUser?.response?.data.message);
        }
    }, [isSuccessDeleteManyUser, isErrorDeleteManyUser]);

    // Hàm xử lý khi click vào 1 dòng trong bảng
    useEffect(() => {
        if (rowSelected) {
            handleDetailsUser();
        }
    }, [rowSelected]);

    //hàm set giá trị cho form khi click vào 1 dòng trong bảng
    useEffect(() => {
        formUpdate.setFieldsValue(stateUserDetails);
    }, [formUpdate, stateUserDetails]);
    return (
        <div>
            {contextHolder}
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    onClick={showModal}
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                    }}
                >
                    <PlusCircleFilled style={{ fontSize: '4rem' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    pagination={{
                        pageSize: 5,
                    }}
                    columns={columnTable}
                    data={dataTable}
                    isLoading={isLoadingUser}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record.key);
                            }, // click row
                        };
                    }}
                    type='người dùng'
                    handleDeleteManyUser={handleDeleteManyUser}
                    isPendingDeleteMutationManyUser={
                        isPendingDeleteMutationManyUser
                    }
                />
            </div>
            <ModalComponent
                forceRender
                footer={null}
                title='Thêm người dùng'
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <LoadingComponent isPending={isPending}>
                    <WrapperForm
                        form={formAdd}
                        name='AddUser'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete='off'
                    >
                        <WrapperForm.Item
                            label='Email'
                            name='emailSignUp'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUser.emailSignUp}
                                onChange={handleOnChange}
                                name='emailSignUp'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Mật khẩu'
                            name='passwordSignUp'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUser.passwordSignUp}
                                onChange={handleOnChange}
                                name='passwordSignUp'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Xác nhận mật khẩu'
                            name='confirmPasswordSignUp'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUser.confirmPasswordSignUp}
                                onChange={handleOnChange}
                                name='confirmPasswordSignUp'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type='primary' htmlType='submit'>
                                Thêm
                            </Button>
                        </WrapperForm.Item>
                    </WrapperForm>
                </LoadingComponent>
            </ModalComponent>

            <DrawerComponent
                forceRender
                title='Thông tin người dùng'
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width={600}
            >
                <LoadingComponent
                    isPending={isPendingUpdate || isPendingUpdateMutation}
                >
                    <WrapperForm
                        form={formUpdate}
                        name='DetailsUser'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onUpdateUser}
                        autoComplete='off'
                    >
                        <WrapperForm.Item
                            label='Tên người dùng'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhâp tên người dùng!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUserDetails.name}
                                onChange={handleOnChangeDetails}
                                name='name'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Email'
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUserDetails.email}
                                onChange={handleOnChangeDetails}
                                name='email'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Số điện thoại'
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUserDetails.phone}
                                onChange={handleOnChangeDetails}
                                name='phone'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Địa chỉ'
                            name='address'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUserDetails.address}
                                onChange={handleOnChangeDetails}
                                name='address'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Thành phố'
                            name='city'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập thành phố!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateUserDetails.city}
                                onChange={handleOnChangeDetails}
                                name='city'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Ảnh đại diện'
                            name='image'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng thêm ảnh!',
                                },
                            ]}
                        >
                            <div>
                                <WrapperUploadFile
                                    maxCount={1}
                                    onChange={handleOnChangeAvatarDetails}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateUserDetails.image && (
                                    <img
                                        src={stateUserDetails.image}
                                        alt='avatar'
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                )}
                            </div>
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type='primary' htmlType='submit'>
                                Cập nhật
                            </Button>
                        </WrapperForm.Item>
                    </WrapperForm>
                </LoadingComponent>
            </DrawerComponent>

            <ModalComponent
                title='Xoá người dùng'
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
            >
                <LoadingComponent isPending={isPendingDeleteMutation}>
                    <div>Bạn có muốn xoá người dùng này không?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    );
};

export default AdminUser;
