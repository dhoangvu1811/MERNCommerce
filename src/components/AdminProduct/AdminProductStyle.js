import { Form, Modal, Upload } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 1.4rem;
`;
export const WrapperForm = styled(Form)`
    & .ant-form-item-label {
        text-align: left;
    }
    & #basic_image {
        display: flex;
        align-items: center;
    }
`;
export const WrapperModal = styled(Modal)`
    & .ant-modal-footer {
        display: none;
    }
`;
export const WrapperUploadFile = styled(Upload)`
    margin-right: 30px;
    & .ant-upload-list-item-container {
        display: none;
    }
`;
