import React, { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { InputArea, PrimaryButton } from '../uikit'
import * as H from 'history'
import { AuthContext } from '../AuthSearvis'
import { Redirect } from 'react-router-dom'

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
        <>
            <h2>サインアップ</h2>
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
            <InputArea
                required = {true}
                fullWidth={false}
                multiline={false}
                rows={1}
                onChange={inputName}
                value={name}
                label={'企業名（仮称でも可）'}
                type={'Text'}
            />
            <PrimaryButton
                label={'サインアップ'}
                onClick={signUpAciton}
            />

        </>
    )
}

export default SignUp