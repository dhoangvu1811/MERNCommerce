import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff !important;
        background-color: rgb(13, 92, 182) !important;
    }
`;
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`;
