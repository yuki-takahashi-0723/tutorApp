import React, { useContext } from 'react'
import { AddButton, ListCard, PrimaryButton } from '../uikit'
import { useState,useEffect } from 'react'
import { auth, store } from '../firebase/config';
import { AuthContext } from '../AuthSearvis';
import FormDialog from '../uikit/FormDialog';



type user = {
        id : string,
        data : {
            avater : string
            diarys : {day: string, title: string, content:string}[]
            userName : string
        }
      }


type Props = {
    uid : string
}


const UserList:React.FC<Props> = (props) =>{
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
                   return <ListCard
                            avater={user.data.avater}
                            name={user.data.userName}
                            key={user.id}
                        />
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