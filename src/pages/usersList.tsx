import React from 'react'
import { AddButton, ListCard } from '../uikit'
import { useState,useEffect } from 'react'
import { store } from '../firebase/config';



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
  
    const [users, setUsers] = useState<any>([]);
      useEffect(() => {
        const masterUserId = 'masterUsers'
        store.collection('masterUsers')
          .onSnapshot(snapshot => {
            return setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
          });
      }, []); 
      console.log(users)      
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
            <AddButton
                onClick={()=>console.log('aaaa')}
            
            />
        </>
    )
}

export default UserList