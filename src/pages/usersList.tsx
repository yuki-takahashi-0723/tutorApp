import React from 'react'
import { ListCard } from '../uikit'

type Props = {
    users: {
        name: string;
        avater: string;
        diarys: {
            title: string;
            day: string;
            content: string;
        }[];
    }[]
}


const UserList:React.FC<Props> = (props) =>{
    return(
        <>
            {
                props.users.map(user=>{
                    return <ListCard
                                name={user.name}
                                avater={user.avater}
                           />
                })
            }
        </>
    )
}

export default UserList