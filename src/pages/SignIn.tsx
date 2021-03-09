import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { auth } from '../firebase/config'
import { InputArea, PrimaryButton } from '../uikit'
import * as H from 'history'
import styled from 'styled-components'
import humsterImage from '../img/IMG_0931.jpeg'
const SignInWrap = styled.div`
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
const SignInForm = styled.div`
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
const Sumple = styled.div`
    background-color:rgba(255,255,255,0.5);
    position:absolute;
    top: 85%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`


type Props = {
    history : H.History
}


const SignIn:React.FC<Props> = ({history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
    const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    const user = useContext(AuthContext)
    console.log(user)
    if(user.crrentUser !== null){
        return (<Redirect to='/userlist'/>)
    }

    const signInAciton = () =>{
        if(email==='' || password === '' || password === ''){
            return false
        }else{
           auth.signInWithEmailAndPassword(email,password)
           .then(user=>{
               console.log(user)
               history.push('/userlist')
           })
        }
    }
    
    return(
        <SignInWrap>
            <SignInForm>
                <Title>サインイン</Title>
                <InputWrap>
                    <div>
                        <InputArea
                            required = {true}
                            fullWidth={true}
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
                            fullWidth={true}
                            multiline={false}
                            rows={1}
                            onChange={inputPassword}
                            value={password}
                            label={'パスワード'}
                            type={'Password'}
                        />

                    </div>
                    <ButtonWrap>
                        <PrimaryButton
                            label={'サインイン'}
                            onClick={signInAciton}
                        />
                    </ButtonWrap>
                    <Sumple>
                    <p>サンプルIDでお試しできます！</p>
                    <p>mail: chuta@asd.ne.jp</p>
                    <p>password: chutasample</p>
                </Sumple>
                </InputWrap>
            </SignInForm>

        </SignInWrap>
    )
}

export default SignIn