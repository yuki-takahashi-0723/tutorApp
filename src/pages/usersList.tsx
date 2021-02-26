import React, { useContext } from 'react'
import { AddButton, ListCard, PrimaryButton } from '../uikit'
import { useState,useEffect } from 'react'
import { auth, store } from '../firebase/config';
import { AuthContext } from '../AuthSearvis';
import FormDialog from '../uikit/FormDialog';
import * as H from 'history'



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
  }
  


  const selectUser = (userId:string,name:string) =>{
    console.log(userId)
    history.push({
     pathname: '/diarylist',
     state : {
         name : name,
        //  diarys: diary.data.diarys
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
        <>
          <h2>{user.crrentUser?.displayName}</h2>
            {
               users.map((user:user)=>{
                   return <div onClick={()=>selectUser(user.id,user.data.userName)}　key={user.id}> 
                            <ListCard
                                    avater={user.data.avater}
                                    name={user.data.userName}
                                
                             />
                          </div>
               })
            }
            <span>新しくユーザーを登録する</span>
            <AddButton
                onClick={()=>handleOpen()}
            />
            <FormDialog
                title = '育成者登録フォーム'
                open = {open}
                handleClose ={handleClose}  
                onChangeFirst = {inputName}
                value = {name}
                label =　'氏名（他のスタッフにわかる範囲で記述）'
                type = 'text'
                AddClick = {addUser}
            
            
            />
            <PrimaryButton
                label={'ログアウト'}
                onClick={()=>auth.signOut()}
            />
        </>
    )
}

export default UserList