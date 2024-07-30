import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import {
    WrapperForm,
    WrapperHeader,
    WrapperModal,
    WrapperUploadFile,
} from './AdminProductStyle';
import TableComponent from '../TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import InputForm from '../InputForm/InputForm';
import { getBase64 } from '../../until';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    // Hàm thông báo
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm sản phẩm thành công',
        });
    };
    const error = (mes = 'Thêm sản phẩm thất bại') => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };

    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        image: '',
    });
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const mutation = useMutationHook((data) => {
        const res = ProductService.createProduct(data);
        return res;
    });
    const { data, isPending, isSuccess, isError, failureReason, failureCount } =
        mutation;
    // console.log('mutation', mutation);
    // console.log('data', data);
    // console.log('failureReason', failureReason?.response?.data.message);

    useEffect(() => {
        if (isSuccess && data?.status === 'success') {
            success();
            handleCancel();
        } else if (failureCount > 0) {
            error(failureReason?.response?.data.message);
        }
    }, [isSuccess, isError]);

    const onFinish = (values) => {
        mutation.mutate(stateProduct);
    };

    const handleOnChange = async (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    // Hàm xử lý khi thay đổi ảnh sản phẩm
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };
    return (
        <div>
            {contextHolder}
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
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
                <TableComponent />
            </div>
            <WrapperModal
                title='Thêm sản phẩm'
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <LoadingComponent isPending={isPending}>
                    <WrapperForm
                        form={form}
                        name='basic'
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
                            label='Tên sản phẩm'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhâp tên sản phẩm!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Phân loại'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập phân loại!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.type}
                                onChange={handleOnChange}
                                name='type'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Số lượng'
                            name='countInStock'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name='countInStock'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Giá'
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name='price'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Đánh giá'
                            name='rating'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đánh giá!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name='rating'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Mô tả'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name='description'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Ảnh'
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
                                    onChange={handleOnChangeAvatar}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateProduct.image && (
                                    <img
                                        src={stateProduct.image}
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
                                Submit
                            </Button>
                        </WrapperForm.Item>
                    </WrapperForm>
                </LoadingComponent>
            </WrapperModal>
        </div>
    );
};

export default AdminProduct;
