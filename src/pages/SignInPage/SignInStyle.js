import styled from 'styled-components';

export const WrapperSignIn = styled.div`
    width: 800px;
    height: 445px;
    border-radius: 20px;
    background: rgb(255, 255, 255);
    display: flex;
`;
export const WrapperContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 40px 45px 24px;
    div.heading {
        margin-bottom: 20px;
    }
    div.heading h4 {
        margin: 0px 0px 10px;
        font-size: 2.4rem;
        font-weight: 500;
    }
    div.heading p {
        margin: 0px;
        font-size: 1.5rem;
    }
    p.forgot-pass {
        color: rgb(13, 92, 182);
        font-size: 1.3rem;
        margin: 20px 0px 0px;
        cursor: pointer;
        display: inline-block;
    }
    p.create-account {
        color: rgb(120, 120, 120);
        font-size: 1.3rem;
        margin: 10px 0px 0px;
    }
    p.create-account span {
        color: rgb(13, 92, 182);
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
    }
`;
export const WrapperContainerRight = styled.div`
    width: 300px;
    border-radius: 20px;
    background: linear-gradient(
        136deg,
        rgb(240, 248, 255) -1%,
        rgb(219, 238, 255) 85%
    );
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    div.content {
        margin-top: 30px;
        color: rgb(11, 116, 229);
        font-size: 1.7rem;
        font-weight: 500;
    }
    div.content h4 {
        margin: 0 0 5px;
    }
    div.content span {
        font-size: 1.3rem;
        color: rgb(11, 116, 229);
        font-weight: 500;
    }
`;
