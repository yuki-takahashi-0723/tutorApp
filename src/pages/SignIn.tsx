import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { auth } from '../firebase/config'
import { InputArea, PrimaryButton } from '../uikit'
import * as H from 'history'

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
        <>
            <h2>サインイン</h2>
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
           
            <PrimaryButton
                label={'サインイン'}
                onClick={signInAciton}

            />

        </>
    )
}

export default SignIn