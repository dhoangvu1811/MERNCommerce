import { Upload } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 1.8rem;
    margin: 4px 0;
`;
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 560px;
    margin: 0 auto;
    padding: 30px;
    gap: 20px;
    border-radius: 10px;
`;
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 1.2rem;
    font-weight: 600;
    width: 100px;
`;
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
`;
export const WrapperUploadFile = styled(Upload)`
    margin-right: 30px;
    & .ant-upload-list-item-container {
        display: none;
    }
`;
