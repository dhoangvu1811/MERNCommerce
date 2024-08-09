import { InputNumber } from 'antd';
import styled from 'styled-components';

export const WrapperContainer = styled.div`
    width: 100%;
`;
export const WrapperValue = styled.div`
    border: 1px solid rgb(194, 225, 255);
    background: rgb(240, 248, 255);
    width: 497px;
    padding: 16px;
    border-radius: 10px;
    font-size: 1.4rem;
`;

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
`;
export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    border: none;
    border-radius: 4px;
`;
export const WrapperInputNumber = styled(InputNumber)`
    width: 50px;
    margin: 0 5px;
    & .ant-input-number-handler-wrap {
        display: none;
    }
`;
