import styled, { keyframes } from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
const linearGrad = 'linear-gradient(to right, #141e30, #243b55)';
const gradClr1 = '#141e30';
const gradClr2 = '#243b55';

const show = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 0;
    z-index: 1;
  }
  50.1% {
    opacity: 1;
    z-index: 5;
  }
  100% {
    transform: translateX(66.7%);
    opacity: 1;
    z-index: 5;
  }
`;

const ScaleBtn = keyframes`
  0% {
    width: 143.67px;
  }
  50% {
    width: 250px;
  }
  100% {
    width: 143.67px;
  }
`;

export const WrapperContainer = styled.div`
    position: relative;
    width: 850px;
    height: 500px;
    background-color: #fff;
    box-shadow: 25px 30px 55px #5557;
    border-radius: 13px;
    overflow: hidden;

    &.right-panel-active {
        .overlay-container {
            transform: translateX(-150%);
        }
        .overlay {
            transform: translateX(50%);
        }
        .overlay-left {
            transform: translateX(25%);
        }
        .overlay-right {
            transform: translateX(35%);
        }
        .sign-in-container {
            transform: translateX(20%);
            opacity: 0;
        }
        .sign-up-container {
            transform: translateX(66.7%);
            opacity: 1;
            z-index: 5;
            animation: ${show} 0.6s;
        }
    }
`;
export const WrapperFormContainer = styled.div`
    position: absolute;
    width: 60%;
    height: 100%;
    padding: 0 40px;
    transition: all 0.6s ease-in-out;

    button {
        margin-top: 17px;
        transition: 80ms ease-in;
    }
    button:hover {
        background: #fff;
        color: ${gradClr1};
    }
`;

export const WrappersignUpContainer = styled(WrapperFormContainer)`
    opacity: 0;
    z-index: 1;
`;
export const WrappersignInContainer = styled(WrapperFormContainer)`
    z-index: 2;
`;
export const WrapperForm = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
`;
export const WrapperSocialContainer = styled.div`
    margin: 20px 0;

    a {
        border: 1px solid #ddd;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 40px;
        width: 40px;
        font-size: 2rem;
    }
`;
export const WrapperInfield = styled.div`
    position: relative;
    margin: 8px 0;
    width: 100%;
`;
export const WrapperButtonComponent = styled(ButtonComponent)`
    border-radius: 20px;
    border: 1px solid ${gradClr1} !important;
    background: ${gradClr2} !important;
    color: #fff !important;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;
export const WrapperButton = styled.button`
    border-radius: 20px;
    border: 1px solid ${gradClr1};
    background: ${gradClr1};
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;
export const WrapperOverlayBtn = styled.button`
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 304px;
    transform: translateX(-50%);
    width: 143.67px;
    height: 40px;
    border: 1px solid #fff;
    background: transparent;
    border-radius: 20px;

    &.btnScaled {
        animation: ${ScaleBtn} 0.3s;
    }
`;
export const WrapperTitle = styled.h1`
    font-size: 3rem;
    font-weight: 700;
`;
export const WrapperAnchor = styled.a`
    color: #333;
    font-size: 1.4rem;
    text-decoration: none;
    margin: 15px 0;
    font-weight: 500;
`;
export const WrapperOverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 60%;
    width: 40%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 9;
`;
export const WrapperOverlay = styled.div`
    position: relative;
    background: ${linearGrad};
    color: #fff;
    left: -150%;
    height: 100%;
    width: 250%;
    transition: transform 0.6s ease-in-out;
`;

export const WrapperOverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    height: 100%;
    width: 340px;
    transition: 0.6s ease-in-out;

    h1 {
        color: #fff;
    }
    button {
        border: none;
        background-color: transparent;
    }
`;

export const WrapperOverlayLeft = styled(WrapperOverlayPanel)`
    right: 60%;
    transform: translateX(-12%);
`;

export const WrapperOverlayRight = styled(WrapperOverlayPanel)`
    right: 0;
    transform: translateX(0%);
`;
export const WrapperText = styled.p`
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 32px 0 35px;
`;
