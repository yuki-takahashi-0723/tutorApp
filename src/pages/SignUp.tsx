import React, { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { InputArea, PrimaryButton } from '../uikit'
import * as H from 'history'
import { AuthContext } from '../AuthSearvis'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import humsterImage from '../img/IMG_0931.jpeg'

const SignUpWrap = styled.div`
    margin:0;
    padding:0;
    width:100vw;
    height:100vh;
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: url(${humsterImage})
    center / cover;
`
const SignUpForm = styled.div`
    width:80vw;
    height:60vh;
    text-align:center;
    background-color:rgba(255,255,255,0.5); //後ほど変更を行う
    display:flex;
    flex-direction:column;
    justify-content:center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    @media (min-width:600px){
      width:60vw;
    }  
    

    
`
const Title = styled.h2`
    margin:0 ;
`

const InputWrap = styled.div`
    width:50vw;
    margin:0 auto;
    text-align:center;
`
const ButtonWrap = styled.div`
    text-align:center;
`





type Props = {
    history : H.History
}

const SignUp:React.FC<Props> = ({history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[name,setName]=useState('')
    const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    const inputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };
    const user = useContext(AuthContext)
    if(user.crrentUser !== null){
       <Redirect to='/userlist'/>
    }

    const signUpAciton = () =>{
        if(email==='' || password === '' || name === ''){
            return false
        }else{
            auth.createUserWithEmailAndPassword(email,password)
                .then(({user})=>{
                    user?.updateProfile({
                        displayName: name
                    })
                    history.push('/userlist')
                })
                .catch(error=>{
                    alert(error)
                })
        }
    }
    
    return(
        <SignUpWrap>
            <SignUpForm>
                <Title>サインアップ</Title>
                <InputWrap>
                    <div>
                        <InputArea
                            required = {true}
                            fullWidth={false}
                            multiline={false}
                            rows={1}
                            onChange={inputEmail}
                            value={email}
                            label={'メールアドレス'}
                            type={'Email'}
                        />
                    </div>
                    <div>
                        <InputArea
                            required = {true}
                            fullWidth={false}
                            multiline={false}
                            rows={1}
                            onChange={inputPassword}
                            value={password}
                            label={'パスワード'}
                            type={'Password'}
                        />
                    </div>
                    <div>
                        <InputArea
                            required = {true}
                            fullWidth={false}
                            multiline={false}
                            rows={1}
                            onChange={inputName}
                            value={name}
                            label={'企業名(仮名加)'}
                            type={'Text'}
                        />
                    </div>
                    <ButtonWrap>
                        <PrimaryButton
                            label={'サインアップ'}
                            onClick={signUpAciton}
                        />
                    </ButtonWrap>
                </InputWrap>
            </SignUpForm>
        </SignUpWrap>
    )
}

export default SignUp