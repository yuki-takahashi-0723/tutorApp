import React, { useContext } from 'react'
import { AddButton, ListCard, PrimaryButton } from '../uikit'
import { useState,useEffect } from 'react'
import { auth, store } from '../firebase/config';
import { AuthContext } from '../AuthSearvis';



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
   const uid =user.crrentUser?.uid
    const [users, setUsers] = useState<any>([]);

    　

      useEffect(() => {
        if(uid !== undefined){
            store.collection(`master:${uid}`)
              .onSnapshot(snapshot => {
                return setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
              });
        } 
      }, []); 
       
    return(
        <>
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
                onClick={()=>console.log('aaaa')}
            />
            <PrimaryButton
                label={'ログアウト'}
                onClick={()=>auth.signOut()}
            />
        </>
    )
}

export default UserList