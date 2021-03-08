import React, { useContext } from 'react'
import { AddButton, ListCard, PrimaryButton } from '../uikit'
import { useState,useEffect } from 'react'
import { auth, store } from '../firebase/config';
import { AuthContext } from '../AuthSearvis';
import FormDialog from '../uikit/FormDialog';
import * as H from 'history'
import styled from 'styled-components'
import GraphPaper from '../img/banner-1571861_1920.jpg'

const Allwrap = styled.div`
    margin : 0;
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(rgba(255, 254, 179, 0.925), rgba(255, 254, 179, 0.6)), url(${GraphPaper}) 
    center / cover;
`
const Title = styled.h1`
    margin: 0;
`
const UserListWrap = styled.div`
    margin: 0 30px 0 30px ;
`
const CardsWrap = styled.div`
    @media (min-width:600px){
        display:flex;
        flex-wrap:wrap;  
    }

`

const CardWrap = styled.div`
    margin:20px;
    @media (min-width:600px){
        width:230px;
    }
`

const ButtonWrap = styled.div`
    text-align:center;
`


type user = {
        id : string,
        data : {
            avater : string
            diarys : {day: string, title: string, content:string}[]
            userName : string
        }
      }


type Props = {
    history : H.History
}


const UserList:React.FC<Props> = ({history}) =>{
  const user =　useContext(AuthContext)
  const  uid =user.crrentUser?.uid
  const [users, setUsers] = useState<any>([]);
  const [open,setOpen]=useState(false)
  const [name,SetName]=useState('')
  const handleOpen = () =>{
      setOpen(true)
  }
  const handleClose = () => {
      setOpen(false)
  }
  const inputName = (e:React.ChangeEvent<HTMLInputElement>)=>{
      SetName(e.target.value)
  }

  const addUser = () =>{
        store.collection(`master:${uid}`).add({
            avater:'new',
            diarys:[{}],
            userName:name 
        })
        SetName('')
        handleClose()
  }
  


  const selectUser = (userId:string,name:string) =>{
    console.log(userId)
    history.push({
     pathname: '/diarylist',
     state : {
         name : name,
         userId : userId,
     }
    
    })
 }



      useEffect(()=> {
          if(uid !== undefined){
            store.collection(`master:${uid}`)
              .onSnapshot(snapshot => {
                 setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
              });
        } 
      }, [uid]); 
    
       
    return(
        <Allwrap>
          <Title>登録育成者の一覧</Title>
          <h2>{user.crrentUser?.displayName}</h2>
          <UserListWrap>
              <span>新しくユーザーを登録する</span>
              <AddButton
                  onClick={()=>handleOpen()}
              />
              <CardsWrap>
                    {
                    users.map((user:user)=>{
                        return <CardWrap onClick={()=>selectUser(user.id,user.data.userName)}　key={user.id}> 
                                    <ListCard
                                            avater={user.data.avater}
                                            name={user.data.userName}
                                            color={'yellow'}
                                    />
                                </CardWrap>
                    })
                    }
              </CardsWrap>
                    <FormDialog
                        title = '育成者登録フォーム'
                        open = {open}
                        handleClose ={handleClose}  
                        onChangeFirst = {inputName}
                        value = {name}
                        label =　'氏名'
                        type = 'text'
                        AddClick = {addUser}
                    />
                <ButtonWrap>
                    <PrimaryButton
                        label={'ログアウト'}
                        onClick={()=>auth.signOut()}
                    />
                </ButtonWrap>
          </UserListWrap>
        </Allwrap>
    )
}

export default UserList