import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleFilled,
    SearchOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Select, Space } from 'antd';
import {
    WrapperForm,
    WrapperHeader,
    WrapperUploadFile,
} from './AdminProductStyle';
import TableComponent from '../TableComponent/TableComponent';
import { useEffect, useRef, useState } from 'react';
import InputForm from '../InputForm/InputForm';
import { getBase64 } from '../../until';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
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
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        image: '',
        newType: '',
        discount: '',
    });
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        image: '',
        newType: '',
        discount: '',
    });

    // Hàm lấy dữ liệu sản phẩm từ api
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };
    // Hàm lấy chi tiết sản phẩm từ api
    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        // console.log('res', res);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                price: res?.data?.price,
                rating: res?.data?.rating,
                description: res?.data?.description,
                image: res?.data?.image,
                discount: res?.data?.discount,
            });
        }
        setIsPendingUpdate(false);
        return res;
    };
    const handleDelete = (e) => {
        setIsModalOpenDelete(true);
    };
    const handleDetailsProduct = (e) => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            setIsOpenDrawer(true);
            fetchGetDetailsProduct(rowSelected);
        }
    };
    const renderAction = () => {
        return (
            <div style={{ display: 'flex', gap: '20px' }}>
                <DeleteOutlined onClick={handleDelete} />
                <EditOutlined onClick={handleDetailsProduct} />
            </div>
        );
    };
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    };
    // Lấy dữ liệu sản phẩm từ api để hiển thị lên bảng
    const queryProduct = useQuery({
        queryKey: ['getAllProduct'],
        queryFn: getAllProduct,
        retry: 1,
        retryDelay: 1000,
    });
    const { isLoading: isLoadingProduct, data: products } = queryProduct;

    // Lấy dữ liệu loại sản phẩm từ api
    const queryTypeProduct = useQuery({
        queryKey: ['getTypeProduct'],
        queryFn: fetchAllTypeProduct,
        retry: 1,
        retryDelay: 1000,
    });
    const { isLoading: isLoadingTypeProduct, data: typeProducts } =
        queryTypeProduct;

    const handleRenderTypeProduct = () => {
        let typeResult =
            typeProducts?.data?.map((item) => ({
                label: item,
                value: item,
            })) || [];
        typeResult.push({ label: 'Thêm loại', value: 'add_type' });
        return typeResult;
    };
    const handleOnChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };
    const handleOnChangeSelectUpdate = (value) => {
        setStateProductDetails({
            ...stateProductDetails,
            type: value,
        });
    };
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
    });

    const columnTable = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                // console.log('value', { value, record });
                if (value === '>=') {
                    return record.price >= 50;
                } else if (value === '<=') {
                    return record.price <= 50;
                }
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                // console.log('value', { value, record });
                if (value === '>=') {
                    return record.rating >= 3;
                } else if (value === '<=') {
                    return record.rating <= 3;
                }
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'CountInStock',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.countInStock - b.countInStock,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return {
                key: product._id,
                name: product.name,
                price: product.price,
                rating: product.rating,
                type: product.type,
                countInStock: product.countInStock,
                description: product.description,
                discount: product.discount,
            };
        });
    // Hàm thêm sản phẩm
    const mutation = useMutationHook((data) => {
        const res = ProductService.createProduct(data);
        return res;
    });
    const { data, isPending, isSuccess, isError, failureReason, failureCount } =
        mutation;

    // Hàm cập nhật sản phẩm
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data;
        const res = ProductService.updateProduct(id, token, rest);
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

    // Hàm cập xóa sản phẩm
    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
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

    // Hàm cập xóa sản phẩm theo checkbox
    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });
    const {
        data: dataDeleteMany,
        isPending: isPendingDeleteMutationMany,
        isSuccess: isSuccessDeleteMany,
        isError: isErrorDeleteMany,
        failureReason: failureReasonDeleteMany,
        failureCount: failureCountDeleteMany,
    } = mutationDeleteMany;
    const handleDeleteManyProduct = (ids) => {
        // console.log('delete many', { _id });
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
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
    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
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
        const data = {
            name: stateProduct.name,
            type:
                stateProduct.type === 'add_type'
                    ? stateProduct.newType
                    : stateProduct.type,
            countInStock: stateProduct.countInStock,
            price: stateProduct.price,
            rating: stateProduct.rating,
            description: stateProduct.description,
            image: stateProduct.image,
            discount: stateProduct.discount,
        };
        mutation.mutate(data, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };
    const onUpdateProduct = (values) => {
        const dataDetails = {
            name: stateProductDetails.name,
            type:
                stateProductDetails.type === 'add_type'
                    ? stateProductDetails.newType
                    : stateProductDetails.type,
            countInStock: stateProductDetails.countInStock,
            price: stateProductDetails.price,
            rating: stateProductDetails.rating,
            description: stateProductDetails.description,
            image: stateProductDetails.image,
            discount: stateProductDetails.discount,
        };
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...dataDetails,
            },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
    };

    const handleOnChange = async (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeDetails = async (e) => {
        setStateProductDetails({
            ...stateProductDetails,
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
    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };
    // Hàm xử lý khi thêm sản phẩm thành công hoặc thất bại
    useEffect(() => {
        if (isSuccess && data?.status === 'success') {
            success('Thêm sản phẩm thành công');
            handleCancel();
        } else if (failureCount > 0) {
            error(failureReason?.response?.data.message);
        }
    }, [isSuccess, isError]);

    // Hàm xử lý khi cập nhật sản phẩm thành công hoặc thất bại
    useEffect(() => {
        if (isSuccessUpdate && dataUpdate?.status === 'success') {
            success('Cập nhật sản phẩm thành công');
            handleCancelUpdate();
        } else if (failureCountUpdate > 0) {
            error(failureReasonUpdate?.response?.data.message);
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    // Hàm xử lý khi xoá sản phẩm thành công hoặc thất bại
    useEffect(() => {
        if (isSuccessDelete && dataDelete?.status === 'success') {
            success('Xoá sản phẩm thành công');
            handleCancelDelete();
        } else if (failureCountDelete > 0) {
            error(failureReasonDelete?.response?.data.message);
        }
    }, [isSuccessDelete, isErrorDelete]);

    // Hàm xử lý khi xoá sản phẩm chọn từ checkbox thành công hoặc thất bại
    useEffect(() => {
        if (isSuccessDeleteMany && dataDeleteMany?.status === 'success') {
            success('Xoá sản phẩm tuỳ chọn thành công');
        } else if (failureCountDeleteMany > 0) {
            error(failureReasonDeleteMany?.response?.data.message);
        }
    }, [isSuccessDeleteMany, isErrorDeleteMany]);

    // Hàm xử lý khi click vào 1 dòng trong bảng
    useEffect(() => {
        if (rowSelected) {
            handleDetailsProduct();
        }
    }, [rowSelected]);

    //hàm set giá trị cho form khi click vào 1 dòng trong bảng
    useEffect(() => {
        formUpdate.setFieldsValue(stateProductDetails);
    }, [formUpdate, stateProductDetails]);

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
                <TableComponent
                    pagination={{
                        pageSize: 5,
                    }}
                    columns={columnTable}
                    data={dataTable}
                    isLoading={isLoadingProduct}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record.key);
                            }, // click row
                        };
                    }}
                    type='sản phẩm'
                    handleDeleteManyProduct={handleDeleteManyProduct}
                    isPendingDeleteMutationMany={isPendingDeleteMutationMany}
                />
            </div>
            <ModalComponent
                forceRender
                footer={null}
                title='Thêm sản phẩm'
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <LoadingComponent isPending={isPending}>
                    <WrapperForm
                        form={formAdd}
                        name='AddProduct'
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
                            <Select
                                name='type'
                                onChange={handleOnChangeSelect}
                                options={handleRenderTypeProduct()}
                            />
                        </WrapperForm.Item>
                        {stateProduct.type === 'add_type' && (
                            <WrapperForm.Item
                                label='Thêm phân loại'
                                name='newType'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập phân loại!',
                                    },
                                ]}
                            >
                                <InputForm
                                    value={stateProduct.newType}
                                    onChange={handleOnChange}
                                    name='newType'
                                />
                            </WrapperForm.Item>
                        )}
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
                            label='Giảm giá'
                            name='discount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giảm giá!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProduct.discount}
                                onChange={handleOnChange}
                                name='discount'
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
                                Thêm
                            </Button>
                        </WrapperForm.Item>
                    </WrapperForm>
                </LoadingComponent>
            </ModalComponent>

            <DrawerComponent
                forceRender
                title='Chi tiết sản phẩm'
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width={600}
            >
                <LoadingComponent
                    isPending={isPendingUpdate || isPendingUpdateMutation}
                >
                    <WrapperForm
                        form={formUpdate}
                        name='DetailsProduct'
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
                        onFinish={onUpdateProduct}
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
                                value={stateProductDetails.name}
                                onChange={handleOnChangeDetails}
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
                            <Select
                                name='type'
                                onChange={handleOnChangeSelectUpdate}
                                options={handleRenderTypeProduct()}
                            />
                        </WrapperForm.Item>
                        {stateProductDetails.type === 'add_type' && (
                            <WrapperForm.Item
                                label='Thêm phân loại'
                                name='newType'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập phân loại!',
                                    },
                                ]}
                            >
                                <InputForm
                                    value={stateProductDetails.newType}
                                    onChange={handleOnChangeDetails}
                                    name='newType'
                                />
                            </WrapperForm.Item>
                        )}
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
                                value={stateProductDetails.countInStock}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.price}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.rating}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.description}
                                onChange={handleOnChangeDetails}
                                name='description'
                            />
                        </WrapperForm.Item>
                        <WrapperForm.Item
                            label='Giảm giá'
                            name='discount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giảm giá!',
                                },
                            ]}
                        >
                            <InputForm
                                value={stateProductDetails.discount}
                                onChange={handleOnChangeDetails}
                                name='discount'
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
                                    onChange={handleOnChangeAvatarDetails}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateProductDetails.image && (
                                    <img
                                        src={stateProductDetails.image}
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
                title='Xoá sản phẩm'
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
            >
                <LoadingComponent isPending={isPendingDeleteMutation}>
                    <div>Bạn có muốn xoá sản phẩm này không?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    );
};

export default AdminProduct;
