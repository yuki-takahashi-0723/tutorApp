import React from 'react'
import { ListCard } from '../uikit'


type Props = {
    name:string
    diarys:{ title: string; day: string; content: string; }[]
        
    
}



const DiaryList:React.FC<Props> = (props) => {
    return(
        <>
            <h2>{props.name}</h2>
            {
                props.diarys.map((diary,index)=>{
                    return <ListCard
                                name={props.name}
                                day={diary.day}
                                diaryTitle={diary.title}
                                key={index}
                            />  
                })
            }
        </>
    )
}

export default DiaryList