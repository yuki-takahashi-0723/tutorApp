import React from 'react'
import styled from 'styled-components'
import * as H from 'history'
import { PrimaryButton } from '../uikit'
import TopImg from '/Users/takahashiyuusei/tutorApp/tutor/src/img/614F01DC-85BE-42C5-8998-065B2BA8186C_1_105_c.jpeg'
type Props = {
    history : H.History
}

const TopView = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: url(${TopImg})
    center / cover;
    
`

const Title = styled.h1`
    margin: 0;
    font-size:60px;
`
const Catch = styled.h2`
    background-color:rgba(255,255,255,0.5);
    font-size:4vw;
    position:absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`

const ButtonWrap = styled.div`
    position:absolute;
    top: 70%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`
const Sumple = styled.div`
    background-color:rgba(255,255,255,0.5);
    position:absolute;
    top: 85%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`


const Top:React.FC<Props> = ({history}) => {
    return (
        <>
            <TopView>
                <Title>chuta</Title>
                <Catch>ビギナー育成をみんなで行うアプリケーション</Catch>
                <Sumple>
                    <p>サンプルIDでお試しできます！</p>
                    <p>mail: chuta@asd.ne.jp</p>
                    <p>password: chutasample</p>
                </Sumple>
                <ButtonWrap>
                    <PrimaryButton
                        label={'サインイン'}
                        onClick={()=>history.push('/signin')}
                    />
                    <PrimaryButton
                        label={'新規登録'}
                        onClick={()=>history.push('/signup')}
                    />
                </ButtonWrap>
            </TopView>
        </>
    )
}

export default Top