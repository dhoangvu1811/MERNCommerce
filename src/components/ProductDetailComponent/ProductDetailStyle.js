import { Col, Image, InputNumber } from 'antd';
import styled from 'styled-components';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export const WrapperStyleImageSmall = styled(Image)`
    width: 64px !important;
    height: 64px !important;
`;
export const WrapperStyleColImage = styled(Col)`
    display: flex;
    flex-basis: unset;
`;
export const WrapperStyleNameProduct = styled.div`
    color: rgb(36, 36, 36);
    font-size: 2.4rem;
    font-weight: 300;
    line-height: 32px;
    word-break: break-all;
`;
export const WrapperStyleTextSell = styled.span`
    font-size: 1.5rem;
    line-height: 24px;
    color: rgb(120, 120, 120);
`;
export const WrapperPriceProduct = styled.div`
    background: #f5f5fa;
    border-radius: 4px;
    border-radius: 8px;
`;
export const WrapperInformationShipping = styled.div`
    display: flex;
    flex-direction: column;
    span.freeShip {
        color: #2cb973;
    }
    span.minusPrice {
        text-decoration: line-through;
    }
`;
export const WrapperPriceTextProduct = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 3.2rem;
    line-height: 40px;
    margin-right: 8px;
    margin-top: 10px;
    font-weight: 500;
    padding: 10px;
`;
export const WrapperAdressProduct = styled.div`
    display: flex;
    background-color: #f5f5fa;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 16px;
    gap: 4px;
    span.address {
        text-decoration: underline;
        font-size: 1.5rem;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span.changeAddress {
        color: rgb(11, 116, 229);
        font-size: 1.6rem;
        line-height: 24px;
        font-weight: 500;
    }
    Button.btnChange {
        color: rgb(10, 104, 255);
    }
`;
export const WrapperQualityProduct = styled.div`
    span.quatityText {
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        margin: 0px;
    }
`;
export const WrapperBtnQualityProduct = styled(ButtonComponent)`
    width: 40px;
`;
export const WrapperInputNumber = styled(InputNumber)`
    width: 50px;
    margin: 0 5px;
`;
export const WrapperBonusServices = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f5f5fa;
    border-radius: 8px;
    padding: 16px;
    gap: 4px;
`;
export const WrapperTextLabel = styled.div`
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: rgb(39, 39, 42);
`;
export const WrapperDetailProduct = styled(Col)`
    gap: 16px;
    display: flex;
    flex-direction: column;
`;
export const WrapperImgBonus = styled.img`
    width: 40px;
    height: 40px;
    opacity: 1;
    border-radius: 35%;
`;
export const WrapperContentBonus = styled.div`
    display: flex;
    flex: 1 1 0%;
    justify-content: space-between;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: rgb(39, 39, 42);
    align-items: center;
`;
export const WrapperBonus = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0px;
    font-size: 14px;
    line-height: 150%;
    font-weight: 400;
    color: rgb(39, 39, 42);
    gap: 8px;
`;
export const WrapperSignup = styled.div`
    color: #0a68ff;
    font-weight: 400;
    cursor: pointer;
`;
export const WrapperBtnBuyAdd = styled.div`
    display: flex;
    gap: 10px;
`;
